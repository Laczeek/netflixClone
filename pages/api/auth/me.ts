import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import { PrismaClient } from '@prisma/client';
import { getCookies } from 'cookies-next';

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
		const user = await prisma.user.findUnique({ where: { email: jwtData.email } });
		if (!user) {
			return res.status(401).json({ error: { message: 'Unautorized request' } });
		}
		return res.json({
			user: { id: user.id, username: user.username, email: user.email, avatarName: user.avatar_name },
		});
	} catch (error) {
		return res.status(500).json({ error: { message: 'Something went wrong when tring to find user.' } });
	}
    finally {
        await prisma.$disconnect();
    }
};

export default handler;
