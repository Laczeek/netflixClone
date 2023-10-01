import Navigation from './Navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navigation />
			{children}
		</>
	);
};

export default RootLayout;
