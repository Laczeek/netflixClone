import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';

import Modal from './Modal';
import LoadingSpinner from '../loading/LoadingSpinner';
import { ErrorType } from '@/store/auth-slice';
import useChangeUser from '@/hooks/useChangeUser';

const AvatarsModal = ({
	closeModal,
	currentAvatarName,
	avatarsNames,
	isLoading,
	error,
}: {
	closeModal: () => void;
	currentAvatarName: string | undefined;
	avatarsNames: string[];
	isLoading: boolean;
	error: ErrorType | null;
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const [choosenAvatar, setChoosenAvatar] = useState('');
	const { changeUserAvatar } = useChangeUser();

	const changeUserAvatarHandler = async () => {
		await changeUserAvatar(choosenAvatar, closeModal);
		setChoosenAvatar('');
	};

	const modal = (
		<Modal closeModal={isLoading ? () => {} : closeModal}>
			<div>
				<h3 className='text-lg md:text-xl font-bold mb-6 tracking-wider text-center'>Choose avatar</h3>
				{!isLoading && (
					<button className='absolute top-6 right-8 p-2' onClick={closeModal}>
						<XMarkIcon className='w-12 h-12 text-white hover:opacity-80' />
					</button>
				)}
				<ul className='grid grid-cols-4 gap-8 md:grid-cols-7 overflow-y-scroll max-h-[300px] md:max-h-max md:overflow-hidden'>
					{avatarsNames &&
						avatarsNames.map(avatarName => {
							if (avatarName === currentAvatarName) {
								return null;
							} else {
								return (
									<li
										key={avatarName}
										className={` p-1 border-2 flex justify-center items-center ${
											choosenAvatar === avatarName ? 'border-netflix-red' : 'border-transparent'
										}`}>
										<button onClick={() => setChoosenAvatar(avatarName)}>
											<Image
												src={`/assets/images/avatars/${avatarName}`}
												width={80}
												height={80}
												className='rounded '
												alt='avatar'
											/>
										</button>
									</li>
								);
							}
						})}
				</ul>
				{choosenAvatar && (
					<button
						className='block mt-10  px-6 py-3 bg-netflix-red text-white font-bold border-2 border-transparent  mx-auto focus:outline-none focus:border-black hover:opacity-80 disabled:opacity-30 disabled:bg-netflix-gray'
						disabled={isLoading}
						onClick={changeUserAvatarHandler}>
						{isLoading ? (
							<div className='flex justify-center'>
								<LoadingSpinner />
								Submitting...
							</div>
						) : (
							'Are you sure?'
						)}
					</button>
				)}
				<p className='text-red-600 text-lg text-center py-4'>{error?.message}</p>
			</div>
		</Modal>
	);

	useEffect(() => {
		setIsMounted(true);
		document.body.classList.add('overflow-y-hidden');
		return () => document.body.classList.remove('overflow-y-hidden');
	}, []);

	if (isMounted) return createPortal(modal, document.getElementById('modals')!);

	return null;
};

export default AvatarsModal;
