import { PrismaClient } from '@prisma/client';
import { getCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const { jwt } = getCookies({ req, res });

	if (!jwt) {
		return res.status(401).json({ error: { message: 'Unautorized request' } });
	}

	const { commentId } = req.body;

	if (!commentId) {
		return res.status(422).json({ error: { message: 'Comment id not provided.' } });
	}

	const prisma = new PrismaClient();

	try {
		const jwtData = jose.decodeJwt(jwt) as { email: string };

		const user = await prisma.user.findUnique({ where: { email: jwtData.email }, select: { comments: true } });

		if (!user) {
			return res.status(401).json({ error: { message: 'Unautorized request' } });
		}

		if (!user.comments.find(comment => comment.id === commentId)) {
			return res.status(401).json({ error: { message: 'Unautorized request' } });
		}

		await prisma.comment.delete({ where: { id: commentId } });

		return res.json({ message: 'Comment deleted successfully.' });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
