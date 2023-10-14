import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import netlixLogo from '/public/assets/images/netflix-logo.svg';
import AvatarDropdown from './AvatarDropdown';
import BarsDropdown from './BarsDropdown';
import GenreDropdown from './GenreDropdown';


const Navigation = () => {
	const [isTop, setIsTop] = useState(true);

	const handleScroll = () => {
		if (window.scrollY === 0) {
			setIsTop(true);
		} else {
			setIsTop(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header className='fixed w-full z-[9999]'>
			<nav className={`${isTop ? 'bg-transparent' : 'bg-black'} transition-colors duration-300`}>
				<div className='container flex justify-between items-center mx-auto p-6 h-[72px]'>
					<div className='flex'>
						<Link href={'/'} className='flex'>
							<Image src={netlixLogo} alt='netlix logo' width={90} height={30} />
						</Link>
						<ul className='hidden md:flex ml-6'>
							<li className='w-full hover:text-gray-300 transition-colors duration-300'>
								<Link href={'/movies'} className='block px-6 py-2 '>
									Movies
								</Link>
							</li>
							<li className='w-full hover:text-gray-300 transition-colors duration-300'>
								<Link href={'/series'} className='block px-6 py-2 h'>
									Series
								</Link>
							</li>
							<li className='w-full hover:text-gray-300 transition-colors duration-300'>
								<GenreDropdown />
							</li>
						</ul>
					</div>

					<BarsDropdown />

					<div className='flex  gap-x-4'>
						<button>
							<MagnifyingGlassIcon className='w-10 h-10' />
						</button>
						<AvatarDropdown />
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navigation;
