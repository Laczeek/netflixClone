import Image from 'next/image';
import userAvatar from '/public/assets/images/user-default-avatar.png';
import { UserIcon, QueueListIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ProductionCardsGrid from '@/components/productions/ProductionCardsGrid';
import { Production } from '@prisma/client';

const DUMMY_PRODUCTIONS: Production[] = [
	{
		id: 'p1',
		allowed_age: '13',
		created_by: 'FDSFSD',
		description: 'FDASFDASFSDAFDDSFAF',
		genre_name: 'ACTION',
		genreId: 'fds2',
		image:
			'https://m.media-amazon.com/images/M/MV5BYzNkY2FiN2MtNDBjZi00N2FkLThmMGEtZDM1OTAwMTg2M2NjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
		length: '1 hour 20 minutes',
		rating: [],
		slug: 'fdsfs',
		title: 'One Piece',
		typeId: 'fds',
		year_of_publication: '2023',
		youtubeURL: 'fdsfsdfsdfsdfdsfsd',
	},
	{
		id: 'p1',
		allowed_age: '13',
		created_by: 'FDSFSD',
		description: 'FDASFDASFSDAFDDSFAF',
		genre_name: 'ACTION',
		genreId: 'fds2',
		image:
			'https://m.media-amazon.com/images/M/MV5BYzNkY2FiN2MtNDBjZi00N2FkLThmMGEtZDM1OTAwMTg2M2NjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
		length: '1 hour 20 minutes',
		rating: [],
		slug: 'fdsfs',
		title: 'One Piece',
		typeId: 'fds',
		year_of_publication: '2023',
		youtubeURL: 'fdsfsdfsdfsdfdsfsd',
	},
	{
		id: 'p1',
		allowed_age: '13',
		created_by: 'FDSFSD',
		description: 'FDASFDASFSDAFDDSFAF',
		genre_name: 'ACTION',
		genreId: 'fds2',
		image:
			'https://m.media-amazon.com/images/M/MV5BYzNkY2FiN2MtNDBjZi00N2FkLThmMGEtZDM1OTAwMTg2M2NjXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
		length: '1 hour 20 minutes',
		rating: [],
		slug: 'fdsfs',
		title: 'One Piece',
		typeId: 'fds',
		year_of_publication: '2023',
		youtubeURL: 'fdsfsdfsdfsdfdsfsd',
	},

];

const AccountPage = () => {
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const isBtnDisabled = (nickname && !password && !password2) || (!nickname && password && password2);

	console.log(isBtnDisabled);

	return (
		<section className='pt-[72px] px-6'>
			<h1 className='text-xl font-bold my-10 flex justify-center items-center'>
				{' '}
				<UserIcon className='h-14 w-14 mr-4' />
				Account
			</h1>

			<div className='w-full max-w-[500px] mx-auto p-10 rounded bg-netflix-gray-light '>
				<Image src={userAvatar} width={50} height={50} className='rounded mx-auto mb-10' alt='avatar' />

				<form>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label className='block text-gray-400 font-bold mb-1 md:mb-0 pr-4'>Nickname:</label>
						</div>
						<div className='md:w-2/3'>
							{' '}
							<input
								type='text'
								placeholder='patryk150500'
								className='w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-netflix-red '
								value={nickname}
								onChange={event => setNickname(event.target.value)}
							/>
						</div>
					</div>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label className='block text-gray-400 font-bold mb-1 md:mb-0 pr-4'>Password:</label>
						</div>
						<div className='md:w-2/3'>
							<input
								type='password'
								placeholder='************'
								className='w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-netflix-red'
								value={password}
								onChange={event => setPassword(event.target.value)}
							/>
						</div>
					</div>
					{password && (
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label className='block text-gray-400 font-bold mb-1 md:mb-0 pr-4'>Confirm Password:</label>
							</div>
							<div className='md:w-2/3'>
								<input
									type='password'
									className='w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-netflix-red'
									value={password2}
									onChange={event => setPassword2(event.target.value)}
								/>
							</div>
						</div>
					)}
					<button
						className='block px-6 py-3 bg-netflix-red text-white font-bold border-2 border-transparent  ml-auto focus:outline-none focus:border-black hover:opacity-80 disabled:opacity-30 disabled:bg-netflix-gray'
						disabled={!isBtnDisabled}>
						Save changes
					</button>
				</form>
				<p>
					<span className='text-gray-400'>Comments: </span> 3
				</p>
			</div>

			<div>
				<h2 className='text-xl font-bold my-10 flex justify-center items-center'>
					{' '}
					<QueueListIcon className='h-14 w-14 mr-4' />
					My Queue
				</h2>
				<div>
					<ProductionCardsGrid productions={DUMMY_PRODUCTIONS}/>
				</div>
			</div>
		</section>
	);
};

export default AccountPage;
