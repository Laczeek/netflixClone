import Head from 'next/head';
import { PrismaClient, Production } from '@prisma/client';

import { GenresWithProductions } from '@/models/models';
import VideoBanner from '@/components/video-banner/VideoBanner';
import ProductionCardsContainer from '@/components/productions/ProductionCardsContainer';

const SeriesPage = ({
	allGenres,
	newSerieForVideoBanner,
}: {
	allGenres: GenresWithProductions;
	newSerieForVideoBanner: Production;
}) => {
	return (
		<section>
			<Head>
				<title>NetflixClone | Series</title>
			</Head>
			<VideoBanner production={newSerieForVideoBanner} />

			<div className='mt-10 lg:-mt-40 container mx-auto px-4'>
				{allGenres.map(genre => (
					<ProductionCardsContainer key={genre.id} productions={genre.productions} genre={genre.name} type='SERIE' />
				))}
			</div>
		</section>
	);
};

export default SeriesPage;

export const getStaticProps = async () => {
	const prisma = new PrismaClient();
	try {
		const allSeriesGenres = await prisma.genre.findMany({
			include: { productions: { where: { type: { name: 'SERIE' } } } },
		});

		if (!allSeriesGenres || allSeriesGenres.length === 0) {
			return {
				notFound: true,
			};
		}

		const newGenreSeries = allSeriesGenres.find(genre => genre.name === 'NEW')?.productions;
		if (!newGenreSeries) {
			return {
				notFound: true,
			};
		}

		const newSerieForVideoBanner = newGenreSeries[0];

		return {
			props: {
				allGenres: allSeriesGenres,
				newSerieForVideoBanner,
			},
		};
	} catch (error: any) {
		console.log(error);
		throw new Error('Failed to fetch series data');
	} finally {
		await prisma.$disconnect();
	}
};
