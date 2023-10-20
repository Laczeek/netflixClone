import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { deleteCookie } from 'cookies-next';

import LoadingSpinner from '../ui/loading/LoadingSpinner';
import { authActions } from '@/store/auth-slice';
import { AppDispatch, RootState } from '@/store/store';

const AvatarDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dispatch: AppDispatch = useDispatch();
	const authStatus = useSelector((state: RootState) => state.auth.authStatus);

	const router = useRouter();

	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: any) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setShowDropdown(false);
		}
	};

	const logoutHandler = () => {
		deleteCookie('jwt');
		dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
		return router.push('/auth');
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	if (authStatus.loading || !authStatus.data) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative text-left ' ref={dropdownRef}>
			<button onClick={() => setShowDropdown(prevState => !prevState)} className='flex'>
				<Image
					src={`/assets/images/avatars/${authStatus.data.avatarName}`}
					alt='default user avatar'
					width={35}
					height={35}
					className='rounded'
				/>
			</button>

			<div
				className={`${showDropdown ? 'absolute' : 'hidden'} mt-3
				 right-0 z-10 bg-netflix-gray-light rounded shadow-2xl `}>
				<ul className='py-3'>
					<li className='w-full'>
						<Link
							href={'/account'}
							className='block px-6 py-2 hover:bg-gray-hover transition-colors duration-300'
							onClick={() => setShowDropdown(false)}>
							Account
						</Link>
					</li>
					<li className='w-full'>
						<button
							className='block w-full px-6 py-2 hover:bg-gray-hover transition-colors duration-300'
							onClick={logoutHandler}>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AvatarDropdown;
