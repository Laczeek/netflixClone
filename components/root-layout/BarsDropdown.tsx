import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/solid';

import GenreDropdown from './GenreDropdown';

const BarsDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: any) => {
		if ((dropdownRef.current && !dropdownRef.current.contains(event.target)) ) {
			setShowDropdown(false);
		}
	};

	const closeBarsDropdown = () => {
		setShowDropdown(false);
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative md:hidden ' ref={dropdownRef}>
			<button className='p-2' onClick={() => setShowDropdown(prevState => !prevState)}>
				<Bars3Icon className='w-12 h-12' />
			</button>

			<div
				className={`${showDropdown ? 'absolute' : 'hidden'} mt-2 left-2/4 -translate-x-2/4
				  z-10 bg-netflix-gray-light rounded shadow-2xl `}>
				<ul className='py-3'>
					<li className='w-full hover:bg-gray-hover transition-colors duration-300'>
						<Link href={'/movies'} className='block px-8 py-2 ' onClick={closeBarsDropdown}>
							Movies
						</Link>
					</li>
					<li className='w-full hover:bg-gray-hover transition-colors duration-300'>
						<Link href={'/series'} className='block px-8 py-2 ' onClick={closeBarsDropdown}>
							Series
						</Link>
					</li>
					<li className='w-full hover:bg-gray-hover transition-colors duration-300'>
						<GenreDropdown closeBarsDropdown = {closeBarsDropdown}/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default BarsDropdown;
