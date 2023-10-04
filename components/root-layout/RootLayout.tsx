import Footer from './Footer';
import Navigation from './Navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
};

export default RootLayout;
