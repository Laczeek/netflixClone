import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
	return (
		<footer className='bg-black py-6'>
			<p className='flex justify-center text-lg items-center'>
				Made with <HeartIcon className='w-12 h-12 text-netflix-red mx-2' /> by Laczeek
			</p>
		</footer>
	);
};

export default Footer;
