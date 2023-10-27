import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GenreName, PrismaClient, Production } from '@prisma/client';

import ProductionCardsGrid from '@/components/productions/ProductionCardsGrid';

interface IParams extends ParsedUrlQuery {
	slug: string;
}

const GenresPage = ({ productions, genre }: { productions: Production[]; genre: string }) => {
	return (
		<section className='pt-[72px]'>
			<Head>
				<title>NetflixClone | {genre.charAt(0).toUpperCase() + genre.slice(1)} </title>
			</Head>
			<h1 className='text-center capitalize text-xl mb-10 font-bold'>
				<span className='text-netflix-red'>{genre}</span> productions
			</h1>
			<ProductionCardsGrid productions={productions} />
		</section>
	);
};

export default GenresPage;

export const getStaticPaths = async () => {
	const prisma = new PrismaClient();
	const allGenresNames = await prisma.genre.findMany({ select: { name: true } });

	await prisma.$disconnect();

	const paths = allGenresNames.map(genreName => ({ params: { slug: genreName.name.toLowerCase() } }));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const { slug } = context.params as IParams;

	const prisma = new PrismaClient();

	try {
		const genre = await prisma.genre.findFirst({
			where: { name: { equals: slug.toUpperCase() as GenreName } },
			include: { productions: true },
		});

		if (!genre || genre.productions.length === 0) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				productions: genre.productions,
				genre: slug,
			},
		};
	} catch (error: any) {
		console.log(error);
		throw new Error(`Failed to fetch ${slug} productions`);
	} finally {
		await prisma.$disconnect();
	}
};
