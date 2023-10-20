import Image from 'next/image';
import { Production } from '@prisma/client';
import { ChatBubbleBottomCenterTextIcon, StarIcon } from '@heroicons/react/24/solid';

import useModal from '@/hooks/useModal';
import PlayerModal from '../ui/modals/PlayerModal';
import PlayerButton from '../ui/buttons/PlayerButton';
import AddButton from '../ui/buttons/AddButton';
import useChangeUser from '@/hooks/useChangeUser';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const MovieDetails = ({ production }: { production: Production }) => {
	const authStatus = useSelector((state: RootState) => state.auth.authStatus);
	const { isModal, showModal, closeModal } = useModal();
	const { changeQueue } = useChangeUser();

	const isThisProductionInUserQueue = authStatus.data?.queue.find(productionId => productionId === production.id);

	const addProductionToQueueHandler = async () => {
		await changeQueue(production.id);
	};

	let rating;
	if (production.rating.length === 0) {
		rating = 'Unrated';
	} else {
		rating = (
			production.rating.reduce((accumulator: number, currentRating: number) => accumulator + currentRating) /
			production.rating.length
		).toFixed(1);
	}

	return (
		<div className='flex flex-col w-full'>
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
				<div className='w-fit'>
					<div className='flex items-center gap-x-6'>
						<h1 className='font-bold text-lg sm:text-xl md:text-2xl border-b-2 border-netflix-red mb-4'>
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
					<div className='flex gap-x-4'>
						<PlayerButton showModal={showModal} />
						{!isThisProductionInUserQueue && !authStatus.loading && (
							<AddButton addProductionToQueueHandler={addProductionToQueueHandler} />
						)}
					</div>
				</div>
			</div>

			<p className='w-fit mx-auto tracking-wide my-10 md:w-[50%] text-center'>{production.description}</p>

			<div>
				<div>
					<ChatBubbleBottomCenterTextIcon className='w-20 h-20 mx-auto' />
				</div>
				<button className='block mt-4 bg-white text-black rounded-lg py-2 px-4 mx-auto hover:bg-black hover:text-white transition-colors duration-300'>
					Add Comment
				</button>
			</div>
		</div>
	);
};

export default MovieDetails;
