import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const GENRES = [
	{ href: '/genres/action', text: 'Action' },
	{ href: '/genres/adventure', text: 'Adventure' },
	{ href: '/genres/anime', text: 'Anime' },
	{ href: '/genres/comedy', text: 'Comedy' },
	{ href: '/genres/crime', text: 'Crime' },
	{ href: '/genres/horror', text: 'Horror' },
	{ href: '/genres/family', text: 'Family' },
];

const GenreDropdown = ({ closeBarsDropdown }: { closeBarsDropdown?: () => void }) => {
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
		<div className='relative px-6 py-2' ref={dropdownRef}>
			<button onClick={() => setShowDropdown(prevState => !prevState)}>Genres</button>

			<div
				className={`${showDropdown ? ' md:absolute' : 'hidden'}  mt-2 md:left-2/4 md:-translate-x-2/4
				  z-10 bg-netflix-gray-light rounded shadow-2xl`}>
				<ul className='py-3'>
					{GENRES.map(genre => (
						<li className='w-full' key={genre.text}>
							<Link
								href={genre.href}
								className='block px-8 py-2 hover:bg-gray-hover transition-colors duration-300'
								onClick={() => (closeBarsDropdown ? closeBarsDropdown() : setShowDropdown(false))}>
								{genre.text}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default GenreDropdown;
