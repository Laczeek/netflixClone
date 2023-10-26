import { PrismaClient } from '@prisma/client';
import { getCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PUT') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const { jwt } = getCookies({ req, res });

	if (!jwt) {
		return res.status(401).json({ error: { message: 'Unautorized request' } });
	}

	const { productionId } = req.body;

	if (!productionId || typeof productionId !== 'string') {
		return res.status(422).json({ error: { message: 'Production id not provided.' } });
	}

	const prisma = new PrismaClient();

	try {
		const newProduction = await prisma.production.findUnique({ where: { id: productionId } });
		if (!newProduction) {
			return res.status(400).json({ error: { message: 'Can not find production with provided id.' } });
		}
		const jwtData = jose.decodeJwt(jwt) as { email: string };

		const user = await prisma.user.findUnique({ where: { email: jwtData.email }, select: { queue: true } });

		if (!user) {
			return res.status(401).json({ error: { message: 'Unautorized request' } });
		}

		if (user.queue.length === 0 || !user.queue.includes(productionId)) {
			await prisma.user.update({
				where: { email: jwtData.email },
				data: { queue: { push: productionId } },
			});
			return res.json({ production: newProduction });
		} else {
			const newQueue = user.queue.filter(id => id !== productionId);
			await prisma.user.update({
				where: { email: jwtData.email },
				data: { queue: newQueue },
			});
			return res.json({ productionId });
		}

	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
