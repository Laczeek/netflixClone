import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import RootLayout from '@/components/root-layout/RootLayout';
import '@/styles/globals.css';

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={`${roboto.variable} font-sans`}>
			<RootLayout>
				<main className='min-h-[100vh]'>
					<Component {...pageProps} />
				</main>
			</RootLayout>
		</div>
	);
}
