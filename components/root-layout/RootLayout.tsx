import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from '@/store/store';
import { authActions } from '@/store/auth-slice';
import Footer from './Footer';
import Navigation from './Navigation';
import { queueActions } from '@/store/queue-slice';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			dispatch(queueActions.changeQueue({ queue: [], isLoading: true }));
			dispatch(authActions.changeAuthStatus({ loading: true, data: null, error: null }));
			try {
				const response = await fetch('/api/auth/me');
				const data = await response.json();

				if (!response.ok) {
					throw data.error;
				}

				dispatch(authActions.changeAuthStatus({ loading: false, data: data.user, error: null }));
				dispatch(queueActions.changeQueue({ queue: data.queue, isLoading: false }));
			} catch (error: any) {
				console.log(error.message);
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
				dispatch(queueActions.changeQueue({ queue: [], isLoading: false }));
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
