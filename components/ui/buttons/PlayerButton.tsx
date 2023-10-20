import { PlayIcon } from '@heroicons/react/24/solid';

const PlayerButton = ({ showModal }: { showModal: () => void }) => {
	return (
		<button
			className='rounded-full bg-white text-black p-5  hover:bg-black hover:text-white transition-colors duration-300'
			onClick={event => {
				event.preventDefault();
				showModal();
			}}>
			<PlayIcon className='w-7 h-7 ' />
		</button>
	);
};

export default PlayerButton;
