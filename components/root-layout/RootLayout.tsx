import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from '@/store/store';
import { authActions } from '@/store/auth-slice';
import Footer from './Footer';
import Navigation from './Navigation';


const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			dispatch(authActions.changeAuthStatus({ loading: true, data: null, error: null }));
			try {
				const response = await fetch('/api/auth/me');
				const data = await response.json();

				if (!response.ok) {
					throw data.error;
				}

				dispatch(authActions.changeAuthStatus({ loading: false, data: data.user, error: null }));
			} catch (error: any) {
				console.log(error.message);
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
			}
		};
		fetchUser();
	}, []);



	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
};

export default RootLayout;
