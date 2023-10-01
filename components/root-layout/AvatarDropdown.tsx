import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import userAvatar from '/public/assets/images/user-default-avatar.png';

const AvatarDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: any) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setShowDropdown(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative text-left ' ref={dropdownRef}>
			<button onClick={() => setShowDropdown(prevState => !prevState)} className='flex'>
				<Image src={userAvatar} alt='default user avatar' width={35} height={35} className='rounded' />
			</button>

			<div
				className={`${showDropdown ? 'absolute' : 'hidden'} mt-3
				 right-0 z-10 bg-netflix-gray-light rounded shadow-2xl `}>
				<ul className='py-3'>
					<li className='w-full'>
						<Link href={'/'} className='block px-6 py-2 hover:bg-gray-hover transition-colors duration-300'>
							Account
						</Link>
					</li>
					<li className='w-full'>
						<Link href={'/'} className='block px-6 py-2 hover:bg-gray-hover transition-colors duration-300'>
							Logout
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AvatarDropdown;
