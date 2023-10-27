import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
	return (
		<footer className='fixed w-full bottom-0  bg-black py-6  z-[9999]'>
			<p className='flex justify-center  items-center'>
				Made with <HeartIcon className='w-12 h-12 text-netflix-red mx-2' /> by Laczeek
			</p>
		</footer>
	);
};

export default Footer;
