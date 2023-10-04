import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { MovieType } from '@/models/models';

const Movie = ({ id, slug, title, image, youtubeURL }: MovieType) => {
	return (
		<div className='max-w-[280px] '>
			<Link href={'/'}>
			<div className='relative opacity-70 group  p-2 border-2 border-transparent hover:opacity-100 hover:border-netflix-red transition-all duration-300'>
				<Image src={image} width={350} height={450} alt={`${title} poster`} className='w-full ' />

				<div className='hidden absolute bottom-8 right-8  group-hover:block '>
					<button className='rounded-full bg-white text-black p-5 mr-4 hover:bg-black hover:text-white transition-colors duration-300'>
						<PlayIcon className='w-7 h-7 ' />
					</button>
					<button className='rounded-full bg-white p-5 text-black  hover:bg-black hover:text-white transition-colors duration-300'>
						<PlusIcon className='w-7 h-7 ' />
					</button>
				</div>
			</div>

			<p className='mt-2 ml-6'>{title}</p>
			</Link>
			
		</div>
	);
};

export default Movie;
