import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import NextProgress from 'next-progress';

import { store } from '../store/store';
import RootLayout from '@/components/root-layout/RootLayout';

import '@/styles/globals.css';

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<div className={`${roboto.variable} font-sans  `}>
			<Head>
				<title>NetflixClone</title>
				<meta name='description' content='This site is a Netflix clone. I invite you to check it out.' />
			</Head>
			<Provider store={store}>
				{router.pathname !== '/auth' ? (
					<RootLayout>
						<NextProgress delay={300} options={{ showSpinner: false }} color='#db0000' height={'4px'} />
						<main className='min-h-[100vh] pb-[72px]'>
							<Component {...pageProps} />
						</main>
					</RootLayout>
				) : (
					<main>
						<Component {...pageProps} />
					</main>
				)}
			</Provider>
		</div>
	);
}
