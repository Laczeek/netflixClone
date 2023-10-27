import Image from 'next/image';
import { Production } from '@prisma/client';
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { CommentWithAuthor} from '@/models/models';
import useModal from '@/hooks/useModal';
import PlayerModal from '../ui/modals/PlayerModal';
import PlayerButton from '../ui/buttons/PlayerButton';
import AddButton from '../ui/buttons/AddButton';
import useChangeUser from '@/hooks/useChangeUser';
import LoadingSpinner from '../ui/loading/LoadingSpinner';

const MovieDetails = ({
	production,
	updatedComments,
	userQueue,
}: {
	production: Production;
	updatedComments: CommentWithAuthor[] | [];
	userQueue: { queue: [] | Production[]; isLoading: boolean };
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isModal, showModal, closeModal } = useModal();
	const { changeQueue } = useChangeUser();

	const isThisProductionInUserQueue = userQueue.queue.find(queueProduction => queueProduction.id === production.id);

	const addProductionToQueueHandler = async () => {
		setIsLoading(true);
		await changeQueue(production.id);
		setIsLoading(false);
	};

	let rating;

	if (updatedComments.length === 0) {
		rating = 'unrated';
	} else {
		rating =
			updatedComments.reduce((accumulator: number, currentComment) => accumulator + currentComment.rating, 0) /
			updatedComments.length;
	}

	return (
		<div className='flex flex-col w-full '>
			{isModal && <PlayerModal title={production.title} youtubeURL={production.youtubeURL} closeModal={closeModal} />}
			<div className='flex gap-x-6 md:gap-x-14  justify-center items-center'>
				<div className='w-[40%] sm:w-auto'>
					<Image
						src={production.image}
						width={500}
						height={1000}
						alt={`Poster for ${production.title}`}
						className='object-contain w-full max-h-[500px]'
					/>
				</div>
				<div className=' max-w-[40%]'>
					<div className='flex items-center gap-x-6 '>
						<h1 className='font-bold text-lg sm:text-xl md:text-2xl border-b-2 border-netflix-red mb-4 break-all '>
							{production.title}
						</h1>
						<p className='text-sm  text-gray-300 w-fit  bg-gray-700 p-2 rounded'>{production.allowed_age}</p>
					</div>
					<p className='text-sm text-gray-500'>
						<span>{production.genre_name.toLowerCase()}</span> | <span>{production.year_of_publication}</span> |{' '}
						<span>{production.length}</span>
					</p>
					<p className='flex md:text-lg'>
						<span>Rating: {rating}</span> <StarIcon className='w-6 h-6 text-yellow-300' />
					</p>
					<div className='my-4'>
						<p className='text-sm md:text-md'>
							Created by: <span className='text-gray-500'>{production.created_by}</span>
						</p>
					</div>
					{!userQueue.isLoading && (
						<div className='flex gap-x-4 items-center'>
							<PlayerButton showModal={showModal} />
							{!isLoading && !isThisProductionInUserQueue && (
								<AddButton addProductionToQueueHandler={addProductionToQueueHandler} />
							)}
							{isLoading && (
								<div className='p-3 bg-white rounded-full'>
									<LoadingSpinner />
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			<p className='w-fit mx-auto tracking-wide my-10 md:w-[60%] text-center'>{production.description}</p>
		</div>
	);
};

export default MovieDetails;
