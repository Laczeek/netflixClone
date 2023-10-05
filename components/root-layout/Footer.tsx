import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
	return (
		<footer className='sticky bottom-0 bg-black py-6 mt-14'>
			<p className='flex justify-center  items-center'>
				Made with <HeartIcon className='w-12 h-12 text-netflix-red mx-2' /> by Laczeek
			</p>
		</footer>
	);
};

export default Footer;
