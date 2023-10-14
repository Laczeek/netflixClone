import { PrismaClient, Production } from '@prisma/client';

import { GenresWithProductions } from '@/models/models';
import VideoBanner from '@/components/video-banner/VideoBanner';
import ProductionCardsContainer from '@/components/productions/ProductionCardsContainer';

export default function HomePage({
	allGenres,
	newProductionForVideoBanner,
}: {
	allGenres: GenresWithProductions;
	newProductionForVideoBanner: Production;
}) {


	return (
		<section >
			<VideoBanner production={newProductionForVideoBanner} />
			<div className='mt-10 lg:-mt-40 container mx-auto px-6'>
				{allGenres.map(genre => (
					<ProductionCardsContainer
						key={genre.id}
						genre={genre.name}
						productions={genre.productions}
						type='PRODUCTION'
					/>
				))}
			</div>
		</section>
	);
}

export const getStaticProps = async () => {
	const prisma = new PrismaClient();
	try {
		const allGenres = await prisma.genre.findMany({ include: { productions: true } });
		const filteredGenres = allGenres.filter(genre => genre.productions.length > 0);

		if (!allGenres || !filteredGenres || filteredGenres.length === 0) {
			return {
				notFound: true,
			};
		}

		const newGenreProductions = filteredGenres.find(genre => genre.name === 'NEW')?.productions;

		if (!newGenreProductions) {
			return {
				notFound: true,
			};
		}

		const newProductionForVideoBanner = newGenreProductions[0];

		return {
			props: { allGenres: filteredGenres, newProductionForVideoBanner },
			revalidate: 86400,
		};
	} catch (error: any) {
		console.log(error);
		throw new Error('Failed to fetch productions data');
	} finally {
		await prisma.$disconnect();
	}
};
