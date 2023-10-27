import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const prisma = new PrismaClient();

	const { slug } = req.query;

	if (!slug) {
		return res.json({ comments: [] });
	}

	try {
		const productionComments = await prisma.production.findUnique({
			where: { slug: slug as string },
			select: { comments: { include: { author: true } } },
		});

		if (!productionComments) {
			return res.json({ comments: [] });
		}

		res.json({ comments: productionComments.comments });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
