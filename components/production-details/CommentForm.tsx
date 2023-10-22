import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AppDispatch } from '@/store/store';
import { authActions } from '@/store/auth-slice';
import LoadingSpinner from '../ui/loading/LoadingSpinner';
import RatingForm from './RatingForm';

const CommentForm = ({ productionId, closeCommentForm }: { productionId: string; closeCommentForm: () => void }) => {
	const [textValue, setTextValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [ratingValue, setRatingValue] = useState<number | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const router = useRouter();
	const dispatch: AppDispatch = useDispatch();

	const isBtnDisabled = textValue.trim().length < 5 || !ratingValue;

	const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 200) {
			return;
		}
		setTextValue(event.target.value);
	};

	const changeRatingHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setRatingValue(+event.target.value);
	};

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!ratingValue || ratingValue < 0 || ratingValue > 5 || textValue.trim().length < 5) {
			return;
		}

		try {
			setIsLoading(true);
			const response = await fetch('/api/production/add-comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text: textValue, ratingValue, productionId }),
			});

			if (response.status === 401) {
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
				return router.push('/auth');
			}
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}

			window.alert(`${data.message}\nThe site will be refreshed.`);
			closeCommentForm();
			router.reload();
		} catch (error: any) {
			console.log(error);
			window.alert(error.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		textareaRef.current!.focus();
	}, []);

	return (
		<form className='max-w-[550px] mx-auto my-10 bg-netflix-gray-medium p-10 rounded ' onSubmit={submitHandler}>
			<RatingForm changeRatingHandler={changeRatingHandler} ratingValue={ratingValue} />
			<label htmlFor='comment' className='block mb-2'>
				Write your comment:
			</label>
			<textarea
				id='comment'
				className='resize-none bg-netflix-gray-light appearance-none border-2 border-white rounded py-2 px-4 text-white focus:outline-none focus:border-netflix-red w-full min-h-[125px]'
				onChange={changeTextHandler}
				value={textValue}
				ref={textareaRef}
			/>
			<span className='ml-auto block w-fit text-sm'>{textValue.length} / 200</span>
			<button
				className='block  bg-netflix-red rounded py-4 px-8 focus:outline-none focus:border-netflix-red hover:opacity-80  disabled:opacity-50 disabled:bg-netflix-gray-light'
				disabled={isBtnDisabled || isLoading}>
				{isLoading ? (
					<div className='flex justify-center'>
						<LoadingSpinner />
						Submitting...
					</div>
				) : (
					'Submit'
				)}
			</button>
		</form>
	);
};

export default CommentForm;
