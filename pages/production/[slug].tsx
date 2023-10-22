import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

import { RootState } from '@/store/store';
import { ProductionWithComments } from '@/models/models';
import ProductionDetails from '@/components/production-details/ProductionDetails';
import CommentForm from '@/components/production-details/CommentForm';
import CommentsContainer from '@/components/production-details/CommentsContainer';

interface IParams extends ParsedUrlQuery {
	slug: string;
}

const MovieDetailsPage = ({ production }: { production: ProductionWithComments }) => {
	const authStatus = useSelector((state: RootState) => state.auth.authStatus);
	const [isCommentFormShow, setIsCommentFormShow] = useState(false);

	const isUserCommentInComments =
		authStatus.data && production.comments.find(comment => comment.author_id === authStatus.data?.id);

	const closeCommentForm = () => {
		setIsCommentFormShow(false);
	};

	return (
		<section className='pt-[72px] px-4  container mx-auto '>
			<ProductionDetails production={production} />

			{!isUserCommentInComments && !authStatus.loading && (
				<button
					className='block my-4 bg-white text-black rounded-lg py-2 px-4 mx-auto hover:bg-black hover:text-white transition-colors duration-300'
					onClick={() => setIsCommentFormShow(prevState => !prevState)}>
					{isCommentFormShow ? 'Hide comment form' : 'Add comment'}
				</button>
			)}

			{isCommentFormShow && <CommentForm productionId={production.id} closeCommentForm={closeCommentForm} />}

			{authStatus.data && production.comments.length > 0 && (
				<ChatBubbleBottomCenterTextIcon className='w-20 h-20 mx-auto mb-6' />
			)}

			{authStatus.data && production.comments.length > 0 && (
				<CommentsContainer comments={production.comments} userId={authStatus.data.id} />
			)}
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
		const production = await prisma.production.findUnique({
			where: { slug },
			include: { comments: { include: { author: true } } },
		});

		if (!production) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				production,
			},
			revalidate: 1,
		};
	} catch (error: any) {
		console.log(error);
		throw new Error('Failed to fetch production data');
	} finally {
		await prisma.$disconnect();
	}
};
