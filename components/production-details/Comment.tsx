import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { authActions } from '@/store/auth-slice';
import { AppDispatch } from '@/store/store';
import { CommentWithAuthor } from '@/models/models';
import Rating from './Rating';
import LoadingSpinner from '../ui/loading/LoadingSpinner';

const Comment = ({
	comment,
	userId,
	removeCommentFromState,
}: {
	comment: CommentWithAuthor;
	userId: string;
	removeCommentFromState: (commentId: string) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const showDeleteButton = comment.author_id === userId;

	const deleteCommentHandler = async () => {
		if (comment.author_id !== userId) {
			return;
		}
		try {
			setIsLoading(true);
			const response = await fetch('/api/production/remove-comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ commentId: comment.id }),
			});

			if (response.status === 401) {
				dispatch(authActions.changeAuthStatus({ loading: false, data: null, error: null }));
				return router.push('/auth');
			}
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}

			removeCommentFromState(comment.id);
		} catch (error: any) {
			console.log(error);
			window.alert(error.message);
		}
		setIsLoading(false);
	};

	return (
		<li className='relative bg-netflix-gray-light rounded-md max-w-[500px] mx-auto p-6 mb-6'>
			{showDeleteButton && (
				<button
					className='absolute -right-4 -top-4 p-2  bg-white text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300group-hover:text-white disabled:pointer-events-none'
					disabled={isLoading}
					onClick={deleteCommentHandler}>
					{!isLoading ? <XMarkIcon className='w-10 h-10 ' /> : <LoadingSpinner />}
				</button>
			)}

			<div className='flex items-center'>
				<div>
					<Image
						src={`/assets/images/avatars/${comment.author.avatar_name}`}
						width={50}
						height={50}
						alt='user avatar'
					/>
				</div>

				<p className='font-bold text-lg mx-4'>{comment.author.username}</p>
				<Rating ratingValue={comment.rating} />
			</div>
			<p className='break-all mt-4'>{comment.text}</p>
		</li>
	);
};

export default Comment;
