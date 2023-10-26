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

	const { text, ratingValue, productionId } = req.body;

	if (!text || !ratingValue || text.trim().length < 5 || ratingValue < 0 || ratingValue > 5 || !productionId) {
		return res.status(422).json({ error: { message: 'Not all the data for the comment was given.' } });
	}

	const prisma = new PrismaClient();

	try {
		const jwtData = jose.decodeJwt(jwt) as { email: string };
		const user = await prisma.user.findUnique({ where: { email: jwtData.email }, include: { comments: true } });

		if (!user) {
			return res.status(401).json({ error: { message: 'Unautorized request' } });
		}

		if (user.comments.find(comment => comment.production_id === productionId)) {
			return res.status(400).json({ error: { message: 'You have already added a comment for this production.' } });
		}

		const newComment = await prisma.comment.create({
			data: {
				rating: ratingValue,
				text,
				production_id: productionId,
				author_id: user.id,
			},
			include: { author: { select: { id: true, username: true, avatar_name: true } } },
		});

		console.log(newComment);

		return res.json({ newComment });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
