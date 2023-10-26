import path from 'path';
import fs from 'fs';
import { useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';

import { RootState } from '@/store/store';
import AccountForm from '@/components/account/AccountForm';
import useModal from '@/hooks/useModal';
import AvatarsModal from '@/components/ui/modals/AvatarsModal';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import QueneOfProductions from '@/components/account/QueueOfProductions';

const AccountPage = ({ avatarsNames }: { avatarsNames: string[] }) => {
	const authStatus = useSelector((state: RootState) => state.auth.authStatus);

	const [inputsValue, setInputsValue] = useState({
		nickname: '',
		password: '',
		password2: '',
	});

	const { isModal, closeModal, showModal } = useModal();

	const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
		setInputsValue(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
	};

	const clearInputsValue = () => {
		setInputsValue({
			nickname: '',
			password: '',
			password2: '',
		});
	};

	return (
		<section className='pt-[72px] container mx-auto px-6 '>
			{isModal && authStatus.data && (
				<AvatarsModal
					currentAvatarName={authStatus.data.avatarName}
					avatarsNames={avatarsNames}
					closeModal={closeModal}
					error={authStatus.error}
					isLoading={authStatus.loading}
				/>
			)}
			<div className='flex justify-center items-center gap-x-2 '>
				<UserIcon className='w-14 h-14' />
				<h1 className='text-xl'>Account</h1>
			</div>

			<div className='flex justify-center my-10'>
				{authStatus.loading || !authStatus.data ? (
					<LoadingSpinner />
				) : (
					<button onClick={showModal}>
						<Image
							src={`/assets/images/avatars/${authStatus.data.avatarName}`}
							width={60}
							height={60}
							alt='user avatar'
						/>
					</button>
				)}
			</div>

			{authStatus.data && (
				<AccountForm
					inputsValue={inputsValue}
					changeInputValue={changeInputValue}
					currentUsername={authStatus.data.username}
					isLoading={authStatus.loading}
					error={authStatus.error}
					clearInputsValue={clearInputsValue}
				/>
			)}
			<QueneOfProductions />
		</section>
	);
};

export default AccountPage;

export const getStaticProps = async () => {
	const pathname = path.join(process.cwd(), '/public/assets/images/avatars');
	const avatarsNames = fs.readdirSync(pathname);

	if (!avatarsNames || avatarsNames.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			avatarsNames,
		},
		revalidate: 86400,
	};
};
