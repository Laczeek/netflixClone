import { PrismaClient, Production } from '@prisma/client';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import ProductionDetails from '@/components/production-details/ProductionDetails';

interface IParams extends ParsedUrlQuery {
	slug: string;
}

const MovieDetailsPage = ({ production }: { production: Production }) => {
	return (
		<section className=' min-h-screen px-4  container mx-auto flex items-center'>
			<ProductionDetails production={production}/>
		</section>
	);
};

export default MovieDetailsPage;

export const getStaticPaths = async () => {
	const prisma = new PrismaClient();
	const mostViewedProductionsSlugs = await prisma.production.findMany({
		where: { genre: { name: 'NEW' } },
		select: { slug: true },
	});

	await prisma.$disconnect();

	const paths = mostViewedProductionsSlugs.map(productionSlug => ({ params: { slug: productionSlug.slug } }));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const { slug } = context.params as IParams;
	const prisma = new PrismaClient();

	try {
		const production = await prisma.production.findUnique({ where: { slug } });

		if (!production) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				production,
			},
			revalidate: 86400,
		};
	} catch (error: any) {
		console.log(error);
		throw new Error('Failed to fetch production data');
	} finally {
		await prisma.$disconnect();
	}
};
