import Image from 'next/image';
import { Production } from '@prisma/client';
import { StarIcon } from '@heroicons/react/24/solid';

import DetailsActions from './DetailsActions';
import useModal from '@/hooks/useModal';
import PlayerModal from '../ui/modals/PlayerModal';

const MovieDetails = ({ production }: { production: Production }) => {
	const { isModal, showModal, closeModal } = useModal();

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
		<div className=' lg:flex lg:gap-x-20 lg:justify-center'>
			{isModal && <PlayerModal title={production.title} youtubeURL={production.youtubeURL} closeModal={closeModal} />}
			<div className='lg:w-[32%]'>
				<Image
					src={production.image}
					width={1000}
					height={1500}
					alt={production.title}
					className='w-full  max-h-[30vh] object-cover  lg:max-h-full'
				/>
			</div>
			<div className='lg:w-[46%] xl:w-[40%] self-center'>
				<div className='flex justify-between items-center gap-x-10 mt-4'>
					<h2 className='text-xl font-bold border-b-4 border-netflix-red lg:text-2xl'>{production.title}</h2>
					<p className='text-lg'>
						{rating} <StarIcon className='w-9 h-9 text-yellow-300 inline-block' />
					</p>
				</div>
				<p className='text-sm text-gray-500 mt-2'>
					<span>{production.year_of_publication}</span> | <span>{production.length}</span> |{' '}
					<span>{production.allowed_age}</span>
				</p>
				<p className='mt-4 leading-relaxed lg:leading-loose lg:my-10'>{production.description}</p>
				<div className='flex gap-x-9 mt-4'>
					<div className='text-gray-500'>
						<p>Created by</p>
						<p>Genre</p>
					</div>
					<div>
						<p>{production.created_by}</p>
						<p className='capitalize'>{production.genre_name.toLowerCase()}</p>
					</div>
				</div>
				<DetailsActions showModal = {showModal}/>
			</div>
		</div>
	);
};

export default MovieDetails;
