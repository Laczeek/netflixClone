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

	const { newAvatarName } = req.body;

	if (!newAvatarName) {
		return res.status(422).json({ error: { message: 'New avatar name not provided.' } });
	}

	const prisma = new PrismaClient();

	try {
		const jwtData = jose.decodeJwt(jwt) as { email: string };
		const user = await prisma.user.update({ where: { email: jwtData.email }, data: { avatar_name: newAvatarName } });

		return res.json({
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				avatarName: user.avatar_name,
				queue: user.queue,
			},
		});
	} catch (error) {
		return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
