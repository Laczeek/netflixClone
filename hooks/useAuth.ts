import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { InputsType } from '@/pages/auth';
import { authActions } from '@/store/auth-slice';

const useAuth = () => {
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');

	const signIn = async(email: string, password: string) => {
		dispatch(authActions.changeAuthStatus({ loading: true, data: null, error: null }));

		if (!emailRegex.test(email)) {
			dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: { email: 'Email is incorrect' } }));
			return;
		}
		if (password.trim().length < 8) {
			dispatch(
				authActions.changeAuthStatus({
					loading: false,
					data: null,
					error: { password: 'Password must have at least 8 characters' },
				})
			);
			return;
		}

		try {
			const response = await fetch('/api/auth/sign-in', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body : JSON.stringify({email, password})
			})

			const data = await response.json();

		
			if(!response.ok){
				throw data.error;
			}
			
				dispatch(authActions.changeAuthStatus({ loading: false, data: data.user, error: null }));
				router.replace('/')
			
		}
		catch(error:any) {
			console.log(error);
			dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: error }));
		}

	};

	const signUp = async(inputs: InputsType) => {
		dispatch(authActions.changeAuthStatus({ loading: true, data: null, error: null }));

		if (!emailRegex.test(inputs.email)) {
			dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: { email: 'Email is incorrect.' } }));
			return;
		}

		if (inputs.username.trim().length < 3) {
			dispatch(
				authActions.changeAuthStatus({
					loading: false,
					data: null,
					error: { username: 'Username must have at least 3 characters.' },
				})
			);
			return;
		}
		if(inputs.username.trim().length > 15) {
			dispatch(
				authActions.changeAuthStatus({
					loading: false,
					data: null,
					error: { username: 'Username must be less than 15 characters long.' },
				})
			);
			return;
		}
		if (inputs.password.trim().length < 8) {
			dispatch(
				authActions.changeAuthStatus({
					loading: false,
					data: null,
					error: { password: 'Password must have at least 8 characters.' },
				})
			);
			return;
		}

		if (inputs.password !== inputs.password2) {
			dispatch(
				authActions.changeAuthStatus({ loading: false, data: null, error: { password2: 'Passwords must be the same.' } })
			);
			return;
		}


		try {
			const response = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body : JSON.stringify(inputs)
			})

			const data = await response.json();

		
			if(!response.ok){
				throw data.error;
			}
			
			dispatch(authActions.changeAuthStatus({ loading: false, data: data.user, error: null }));
			router.replace('/')
		}
		catch(error:any) {
			console.log(error);
			dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: error }));
		}

	};

	const clearAuthStatus = () => {
		dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
	};

	return { signIn, signUp, clearAuthStatus };
};

export default useAuth;
