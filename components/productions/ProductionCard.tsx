import Image from 'next/image';
import Link from 'next/link';
import { Production } from '@prisma/client';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import PlayerModal from '../ui/modals/PlayerModal';
import useModal from '@/hooks/useModal';

const ProductionCard = ({ production }: { production: Production }) => {
	const { isModal, showModal, closeModal } = useModal();

	return (
		<div className='max-w-[280px]'>
			{isModal && <PlayerModal youtubeURL={production.youtubeURL} closeModal={closeModal} title={production.title} />}
			<Link href={`/production/${production.slug}`}>
				<div className='relative opacity-70 group  p-2 border-2 border-transparent hover:opacity-100 hover:border-netflix-red transition-all duration-300'>
					<Image
						src={production.image}
						width={350}
						height={450}
						alt={`${production.title} poster`}
						className='w-full h-[348px]  object-cover'
					/>

					<div className='hidden absolute bottom-8 right-8  group-hover:block '>
						<button
							className='rounded-full bg-white text-black p-5 mr-4 hover:bg-black hover:text-white transition-colors duration-300'
							onClick={event => {
								event.preventDefault();
								showModal();
							}}>
							<PlayIcon className='w-7 h-7 ' />
						</button>
						<button className='rounded-full bg-white p-5 text-black  hover:bg-black hover:text-white transition-colors duration-300'>
							<PlusIcon className='w-7 h-7 ' />
						</button>
					</div>
				</div>

				<p className='mt-2 ml-6'>{production.title}</p>
			</Link>
		</div>
	);
};

export default ProductionCard;
