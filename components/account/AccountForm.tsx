import { ChangeEvent, FormEvent } from 'react';

import { ErrorType } from '@/store/auth-slice';
import useChangeUser from '@/hooks/useChangeUser';
import LoadingSpinner from '../ui/loading/LoadingSpinner';

const AccountForm = ({
	inputsValue,
	changeInputValue,
	currentUsername,
	isLoading,
	error,
	clearInputsValue,
}: {
	inputsValue: { nickname: string; password: string; password2: string };
	changeInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
	currentUsername: string;
	isLoading: boolean;
	error: ErrorType | null;
	clearInputsValue: () => void;
}) => {
	const { changeUser } = useChangeUser();

	let isBtnDisabled = true;
	if (inputsValue.nickname && !inputsValue.password && !inputsValue.password2) {
		isBtnDisabled = false;
	} else if (!inputsValue.nickname && inputsValue.password && inputsValue.password2) {
		isBtnDisabled = false;
	} else if (inputsValue.nickname && inputsValue.password && inputsValue.password2) {
		isBtnDisabled = false;
	}

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await changeUser(inputsValue, clearInputsValue);
	};

	return (
		<form className='max-w-[500px] bg-netflix-gray-light px-10 py-16 mx-auto' onSubmit={submitHandler}>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label className='block text-gray-400 font-bold mb-1 md:mb-0 pr-4'>Username:</label>
				</div>
				<div className='md:w-2/3'>
					{' '}
					<input
						type='text'
						placeholder={currentUsername}
						className='w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-netflix-red '
						name='nickname'
						value={inputsValue.nickname}
						onChange={changeInputValue}
					/>
					<span className='text-sm text-red-500 ml-2'>{error?.username}</span>
				</div>
			</div>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label className='block text-gray-400 font-bold mb-1 md:mb-0 pr-4'>Password:</label>
				</div>
				<div className='md:w-2/3'>
					<input
						type='password'
						placeholder='************'
						className='w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-netflix-red'
						name='password'
						value={inputsValue.password}
						onChange={changeInputValue}
					/>
					<span className='text-sm text-red-500 ml-2'>{error?.password}</span>
				</div>
			</div>

			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label className='block text-gray-400 font-bold mb-1 md:mb-0 pr-4'>Confirm Password:</label>
				</div>
				<div className='md:w-2/3'>
					<input
						type='password'
						className='w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-netflix-red'
						placeholder='************'
						value={inputsValue.password2}
						name='password2'
						onChange={changeInputValue}
					/>
					<span className='text-sm text-red-500 ml-2'>{error?.password2}</span>
				</div>
			</div>

			<button
				className='block px-6 py-3 bg-netflix-red text-white font-bold border-2 border-transparent  ml-auto focus:outline-none focus:border-black hover:opacity-80 disabled:opacity-30 disabled:bg-netflix-gray'
				disabled={isBtnDisabled || isLoading}
				type='submit'>
				{isLoading ? (
					<div className='flex justify-center'>
						<LoadingSpinner />
						Submitting...
					</div>
				) : (
					'Save changes'
				)}
			</button>
		</form>
	);
};

export default AccountForm;
