import { ChangeEvent, FormEvent } from 'react';
import { InputsType } from '@/pages/auth';
import LoadingSpinner from '../ui/loading/LoadingSpinner';

const AuthForm = ({
	isSignIn,
	changeInputValue,
	inputs,
	isBtnDisabled,
	handleSubmit,
	error,
	isLoading,
}: {
	isSignIn: boolean;
	changeInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
	inputs: InputsType;
	isBtnDisabled: boolean;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
	error: null | { email?: string; password?: string; username?: string; password2?: string; message?: string };
	isLoading: boolean;
}) => {
	return (
		<form className='w-full' onSubmit={handleSubmit}>
			<div className='mb-6'>
				<input
					type='text'
					placeholder='Email'
					className='w-full bg-netflix-gray-light appearance-none border-2 border-transparent rounded py-2 px-4 text-white focus:outline-none focus:border-netflix-red '
					name='email'
					onChange={changeInputValue}
					value={inputs.email}
				/>
				<span className='text-sm text-red-500 ml-2'>{error?.email}</span>
			</div>

			{!isSignIn && (
				<div className='mb-6'>
					<input
						type='text'
						placeholder='Username'
						className='w-full bg-netflix-gray-light appearance-none border-2 border-transparent rounded py-2 px-4 text-white focus:outline-none focus:border-netflix-red '
						name='username'
						onChange={changeInputValue}
						value={inputs.username}
					/>
					<span className='text-sm text-red-500 ml-2'>{error?.username}</span>
				</div>
			)}

			<div>
				<input
					type='password'
					placeholder='Password'
					className='w-full bg-netflix-gray-light appearance-none border-2 border-transparent rounded py-2 px-4 text-white focus:outline-none focus:border-netflix-red '
					name='password'
					onChange={changeInputValue}
					value={inputs.password}
				/>
				<span className='text-sm text-red-500 ml-2'>{error?.password}</span>
			</div>

			{!isSignIn && (
				<div className='mt-6'>
					<input
						type='password'
						placeholder='Confirm Password'
						className='w-full bg-netflix-gray-light appearance-none border-2 border-transparent rounded py-2 px-4 text-white focus:outline-none focus:border-netflix-red '
						name='password2'
						onChange={changeInputValue}
						value={inputs.password2}
					/>
					<span className='text-sm text-red-500 ml-2'>{error?.password2}</span>
				</div>
			)}

			<button
				className='block w-full bg-netflix-red rounded py-3 focus:outline-none focus:border-netflix-red hover:opacity-80 mt-16 disabled:opacity-50 disabled:bg-netflix-gray'
				disabled={isBtnDisabled || isLoading}>
				{!isLoading && (isSignIn ? 'Sign In' : 'Sign Up')}
				{isLoading && (
					<div className='flex justify-center'>
						<LoadingSpinner />
						Submitting...
					</div>
				)}
			</button>
		</form>
	);
};

export default AuthForm;
