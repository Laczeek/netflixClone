import { StarIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';

const DetailsActions = ({ showModal }: { showModal: () => void }) => {
	return (
		<div className=' mt-10 lg:flex lg:justify-between '>
			<button className='flex items-center rounded-full bg-white text-black py-5 px-8 hover:bg-black hover:text-white transition-colors duration-300' onClick={showModal}>
				<PlayIcon className='w-7 h-7 mr-2' />
				See trailer
			</button>
			<button className='flex items-center rounded-full bg-white text-black py-5 px-8 hover:bg-black hover:text-white transition-colors duration-300 mt-8 lg:mt-0'>
				<PlusIcon className='w-7 h-7 mr-2' />
				Add to queue
			</button>
			<button className='flex items-center rounded-full bg-white text-black py-5 px-8 hover:bg-black hover:text-white transition-colors duration-300 mt-8 lg:mt-0'>
				<StarIcon className='w-7 h-7 mr-2' />
				Add rating
			</button>
		</div>
	);
};

export default DetailsActions;
