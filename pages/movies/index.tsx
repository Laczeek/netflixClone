import Head from 'next/head';
import { PrismaClient, Production } from '@prisma/client';

import { GenresWithProductions } from '@/models/models';
import VideoBanner from '@/components/video-banner/VideoBanner';
import ProductionsCardsContainer from '@/components/productions/ProductionCardsContainer';



export default function MoviesPage({allGenres, newMovieForVideoBanner}: {allGenres: GenresWithProductions, newMovieForVideoBanner: Production}) {
	return (
		<section>
			<Head>
				<title>NetflixClone | Movies</title>
			</Head>
			<VideoBanner production={newMovieForVideoBanner} />
			<div className='mt-10 lg:-mt-40 container mx-auto px-4'>
				{allGenres.map(genre => <ProductionsCardsContainer key={genre.id} productions={genre.productions} genre={genre.name} type='MOVIE'/>)}
			</div>
		</section>
	);
}

export const getStaticProps = async () => {
	const prisma = new PrismaClient();
	try {
		const allMoviesGenres = await prisma.genre.findMany({
			include: { productions: { where: { type: { name: 'MOVIE' } } } },
		});

		if (!allMoviesGenres || allMoviesGenres.length === 0) {
			return {
				notFound: true,
			};
		}

		const newGenreMovies = allMoviesGenres.find(genre => genre.name === 'NEW')?.productions;
		if(!newGenreMovies) {
			return {
				notFound: true,
			};
		}

		const newMovieForVideoBanner = newGenreMovies[0];

		return {
			props: {
				allGenres : allMoviesGenres,
				newMovieForVideoBanner
			}
		}

	} catch (error: any) {
		console.log(error);
		throw new Error('Failed to fetch movies data');
	} finally {
		await prisma.$disconnect();
	}
};
