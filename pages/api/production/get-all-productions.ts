import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const prisma = new PrismaClient();

	try {
		const allProductions = await prisma.production.findMany();

		return res.json({ productions: allProductions });
	} catch (error) {
        console.log(error);
        return res.status(500).json({error:{message:'Something went wrong on the server.'}})
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
