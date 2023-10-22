import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import AuthForm from '@/components/auth/AuthForm';
import netflixBgImage from '/public/assets/images/netflix-wallpaper2.webp';
import useAuth from '@/hooks/useAuth';

export interface InputsType {
	email: string;
	username: string;
	password: string;
	password2: string;
}

const AuthPage = () => {
	const authStatus = useSelector((state: RootState) => state.auth.authStatus);

	console.log(authStatus);

	const [isSignIn, setIsSignIn] = useState(true);

	const [inputs, setInputs] = useState({
		email: '',
		username: '',
		password: '',
		password2: '',
	});

	const { signIn, signUp, clearAuthStatus } = useAuth();

	let isBtnDisabled: boolean;
	if (isSignIn && (!inputs.email || !inputs.password)) {
		isBtnDisabled = true;
	} else if (!isSignIn && (!inputs.email || !inputs.username || !inputs.password || !inputs.password2)) {
		isBtnDisabled = true;
	}  else {
		isBtnDisabled = false;
	}

	const changeForm = () => {
		setIsSignIn(prevState => !prevState);
		setInputs({ email: '', username: '', password: '', password2: '' });
		clearAuthStatus();
	};

	const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
		setInputs(prevInputs => ({ ...prevInputs, [event.target.name]: event.target.value }));
	};

	const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isSignIn) {
			await signIn(inputs.email, inputs.password);
		} else {
			await signUp(inputs);
		}
	};

	return (
		<section className='relative w-screen h-screen flex justify-center items-center'>
			<Image src={netflixBgImage} fill={true} alt='background image' className='absolute h-full w-full object-cover' />
			<div className='absolute w-full h-full bg-black bg-opacity-30'></div>

			<div className='z-30 w-full max-w-[400px] p-16 bg-black bg-opacity-70'>
				<h1 className='text-lg font-bold mb-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
				<AuthForm
					isSignIn={isSignIn}
					changeInputValue={changeInputValue}
					inputs={inputs}
					isBtnDisabled={isBtnDisabled}
					handleSubmit={handleSubmit}
					error={authStatus.error}
					isLoading = {authStatus.data && true|| authStatus.loading}
				/>
				<p className='my-20 text-red-600 text-center '>{authStatus.error?.message}</p>
				<div className=' text-gray-400 '>
					{isSignIn ? (
						<span>
							New to NetflixClone?{' '}
							<button className='font-bold text-gray-300' onClick={changeForm}>
								Sign up now
							</button>
						</span>
					) : (
						<span>
							Already have an account ?{' '}
							<button className='font-bold text-gray-300' onClick={changeForm}>
								Sign In now
							</button>
						</span>
					)}
				</div>
			</div>
		</section>
	);
};

export default AuthPage;
