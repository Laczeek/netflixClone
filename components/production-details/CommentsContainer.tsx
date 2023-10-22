import { CommentWithAuthor } from '@/models/models';
import Comment from './Comment';

const CommentsContainer = ({ comments, userId }: { comments: CommentWithAuthor[], userId:string }) => {
	const reverseComments = comments.reverse();

	return (
		<ul>
			{reverseComments.map(comment => (
				<Comment comment={comment} key={comment.id} userId = {userId}/>
			))}
		</ul>
	);
};

export default CommentsContainer;
