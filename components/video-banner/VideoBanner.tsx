import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const VideoBanner = () => {
	return (
		<div className=' max-h-[85vh] overflow-hidden flex justify-center items-center'>
			<div className=' relative aspect-video w-full z-0 '>
				<ReactPlayer
					className='absolute top-0 left-0 -z-10'
					url='https://www.youtube.com/watch?v=Ades3pQbeh8'
					controls={false}
					height='100%'
					width='100%'
					loop={true}
					playing={true}
					muted={true}
				/>
				<div className='absolute top-0 bottom-0 left-0 right-0 bg-black opacity-60 -z-10'></div>
			</div>
			<div className='absolute container px-4  mt-14 '>
				<div>
					<h1 className='text-md font-bold sm:text-2xl lg:text-4xl'>Movie Title</h1>
					<p className=' text-sm sm:text-md sm:max-w-[60%] h-[42px] overflow-ellipsis overflow-hidden sm:h-auto'>
						Movie description Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.m dolor sit amet. Lorem ipsum dolor
						sm dolor sit amet. Lorem ipsum dolor sm dolor sit amet. Lorem ipsum dolor s
					</p>
				</div>
				<div className='mt-4 sm:mt-6 flex'>
					<button className='text-sm rounded bg-white text-black py-2 px-6 mr-4 flex items-center gap-x-2 sm:text-md hover:opacity-75 transition-opacity duration-300'>
						<PlayIcon className='h-8 w-8' />
						Play
					</button>
					<button className='text-sm rounded bg-gray-500  py-2 px-4 flex items-center gap-x-2 sm:text-md hover:opacity-75 transition-opacity duration-300'>
						<InformationCircleIcon className='h-8 w-8' /> More info
					</button>
				</div>
			</div>
		</div>
	);
};

export default VideoBanner;
