import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import DetailsActions from './DetailsActions';

const DUMMY_MOVIE = {
	id: 'm1',
	title: 'One Piece',
	description:
		'Calling themselves the Straw Hats, Luffy and his gang sail from island to island in search of the mysterious One Piece treasure. Of course, no adventure is smooth sailing. On their quest, the Straw Hats run into dangerous rivals who stand in their way of hitting the jackpot.',
	slug: 'one-piece',
	image:
		'https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2023/01/31/ce9f52f2-5bd4-49ca-9d71-28bc2e32878b_351db1ba.jpg',
	youtubeURL: 'https://www.youtube.com/watch?v=Ades3pQbeh8',
	rating: [2, 4],
};

const MovieDetails = () => {
	const rating =
		DUMMY_MOVIE.rating.reduce((accumulator: number, currentRating: number) => accumulator + currentRating) /
		DUMMY_MOVIE.rating.length;

	return (
		<div className='mt-2 lg:flex lg:gap-x-10 max-h-[80vh] lg:mt-10 lg:justify-center'>
			<div className='lg:w-[40%]'>
				<Image
					src={DUMMY_MOVIE.image}
					width={1000}
					height={1000}
					alt={DUMMY_MOVIE.title}
					className='w-full  max-h-[30vh] object-cover lg:max-h-full'
				/>
			</div>
			<div className='lg:w-[46%] xl:w-[40%]'>
				<div className='flex justify-between items-center gap-x-10 mt-4'>
					<h2 className='text-xl font-bold border-b-4 border-netflix-red lg:text-2xl'>{DUMMY_MOVIE.title}</h2>
					<p className='text-lg'>
						{rating.toFixed(1)} <StarIcon className='w-9 h-9 text-yellow-300 inline-block' />
					</p>
				</div>
				<p className='text-sm text-gray-500 mt-2'>
					<span>2008</span> | <span>2h 33min</span> | <span>16+</span>
				</p>
				<p className='mt-4 leading-relaxed lg:leading-loose lg:my-10'>{DUMMY_MOVIE.description}</p>
				<div className='flex gap-x-9 mt-4'>
					<div className='text-gray-500'>
						<p>Created by</p>
						<p>Genre</p>
					</div>
					<div>
						<p>Patryk P</p>
						<p>Action, Fantasy</p>
					</div>
				</div>
				<DetailsActions />
			</div>
		</div>
	);
};

export default MovieDetails;
