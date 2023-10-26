import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { authActions } from '@/store/auth-slice';
import { AppDispatch } from '@/store/store';
import { queueActions } from '@/store/queue-slice';

const useChangeUser = () => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();

	const changeUserAvatar = async (newAvatarName: string, closeModal: () => void) => {
		dispatch(authActions.changeAuthStatus({ loading: true, error: null }));
		if (!newAvatarName) {
			return dispatch(
				authActions.changeAuthStatus({ loading: false, error: { message: 'New avatar has not been choosen.' } })
			);
		}

		try {
			const response = await fetch('/api/user/change-avatar', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ newAvatarName }),
			});

			if (response.status === 401) {
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
				return router.push('/auth');
			}
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}
			dispatch(authActions.changeAuthStatus({ loading: false, data: data.user, error: null }));
			closeModal();
		} catch (error: any) {
			console.log(error.message);
			dispatch(authActions.changeAuthStatus({ loading: false, error: error }));
		}
	};

	const changeUser = async (
		inputs: { nickname: string; password: string; password2: string },
		clearInputs: () => void
	) => {
		dispatch(authActions.changeAuthStatus({ loading: true, error: null }));

		if (!inputs.nickname && !inputs.password && !inputs.password2) {
			return dispatch(
				authActions.changeAuthStatus({ loading: false, error: { message: 'Input / inputs not provided.' } })
			);
		}

		try {
			const response = await fetch('/api/user/change-user', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					newUsername: inputs.nickname,
					newPassword: inputs.password,
					newPassword2: inputs.password2,
				}),
			});

			if (response.status === 401) {
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
				return router.push('/auth');
			}
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}
			dispatch(authActions.changeAuthStatus({ loading: false, data: data.user, error: null }));
			clearInputs();
		} catch (error: any) {
			console.log(error);
			dispatch(authActions.changeAuthStatus({ loading: false, error: error }));
		}
	};

	const changeQueue = async (productionId: string) => {
		if (!productionId) {
			return;
		}

		try {
			const response = await fetch('/api/user/change-queue', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ productionId }),
			});

			if (response.status === 401) {
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
				return router.push('/auth');
			}
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}
			if (data.production) {
				dispatch(queueActions.addToQueue(data.production));
			} else {
				dispatch(queueActions.removeFromQueue(data.productionId));
			}
		} catch (error: any) {
			console.log(error);
			window.alert(error.message);
		}
	};

	return { changeUserAvatar, changeUser, changeQueue };
};

export default useChangeUser;
