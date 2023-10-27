import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

import Link from 'next/link';
import { Production } from '@prisma/client';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

import useModal from '@/hooks/useModal';
import PlayerModal from '../ui/modals/PlayerModal';

const VideoBanner = ({ production }: { production: Production }) => {
	const { isModal, showModal, closeModal } = useModal();

	return (
		<div className=' max-h-[85vh] overflow-hidden flex justify-center items-center'>
			{isModal && <PlayerModal title={production.title} youtubeURL={production.youtubeURL} closeModal={closeModal} />}
			<div className=' relative aspect-video w-full z-0 '>
				<ReactPlayer
					className='absolute top-0 left-0 -z-10'
					url={`${production.youtubeURL}`}
					controls={false}
					height='100%'
					width='100%'
					loop={true}
					playing={true}
					muted={true}
				/>
				<div className='absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 -z-10'></div>
			</div>
			<div className='absolute container px-6  mt-14 '>
				<div>
					<h1 className='text-md font-bold sm:text-2xl lg:text-4xl'>{production.title}</h1>
					<p className='pl-2 text-sm sm:text-md sm:max-w-[60%] h-[42px] overflow-ellipsis overflow-hidden sm:h-[162px] md:h-auto'>
						{production.description}
					</p>
				</div>
				<div className='pl-2 mt-4 sm:mt-6 flex'>
					<button
						className='text-sm rounded bg-white text-black py-2 px-6 mr-4 flex items-center gap-x-2 sm:text-md hover:opacity-75 transition-opacity duration-300'
						onClick={showModal}>
						<PlayIcon className='h-8 w-8' />
						Play
					</button>
					<Link
						href={`/production/${production.slug}`}
						className='text-sm rounded bg-gray-500  py-2 px-4 flex items-center gap-x-2 sm:text-md hover:opacity-75 transition-opacity duration-300'>
						<InformationCircleIcon className='h-8 w-8' /> More info
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VideoBanner;
