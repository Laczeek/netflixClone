import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactPlayer from 'react-player';
import { XMarkIcon } from '@heroicons/react/24/solid';


const PlayerModal = ({
	title,
	youtubeURL,
	closeModal,
}: {
	title: string;
	youtubeURL: string;
	closeModal: () => void;
}) => {
	const [isMounted, setIsMounted] = useState(false);

	const modal = (
		<div
			className='fixed inset-0 z-[9999] w-full h-screen bg-netflix-gray-light bg-opacity-70  transition-opacity flex justify-center items-center '
			onClick={closeModal}>
			<div
				className='absolute  p-6 sm:p-12 w-[95%]  max-w-[900px] bg-netflix-gray-medium flex flex-col justify-center items-center rounded-2xl '
				onClick={event => event.stopPropagation()}>
				<h3 className='text-lg md:text-xl font-bold mb-6 tracking-wider'>{title}</h3>
				<button className='absolute top-6 right-8 p-2' onClick={closeModal}>
					<XMarkIcon className='w-12 h-12 text-white hover:opacity-80' />
				</button>
				<div className='relative  aspect-video w-full '>
					<ReactPlayer
						className='absolute  top-0 left-0'
						url={`${youtubeURL}`}
						controls={true}
						height='100%'
						width='100%'
						playing={true}
						volume={0.1}
					/>
				</div>
			</div>
		</div>
	);
	useEffect(() => {
		setIsMounted(true);
		document.body.classList.add('overflow-y-hidden');
		return () => document.body.classList.remove('overflow-y-hidden');
	}, []);

	if (isMounted) return createPortal(modal, document.getElementById('modals')!);

	return null;
};

export default PlayerModal;
