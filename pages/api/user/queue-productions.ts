import { getCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import { PrismaClient } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const { jwt } = getCookies({ req, res });

	if (!jwt) {
		return res.status(401).json({ error: { message: 'Unautorized request' } });
	}

	const prisma = new PrismaClient();

	try {
		const jwtData = jose.decodeJwt(jwt) as { email: string };

		const user = await prisma.user.findUnique({ where: { email: jwtData.email }, select: { queue: true } });
		if (!user || !user.queue) {
			return res.json({ productions: [] });
		}
		const productions = await prisma.production.findMany({ where: { id: { in: user.queue } } });
		if (!productions) {
			return res.json({ productions: [] });
		}

		return res.json({ productions });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
