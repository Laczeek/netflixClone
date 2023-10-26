import { CommentWithAuthor } from '@/models/models';
import Comment from './Comment';

const CommentsContainer = ({ comments, userId, removeCommentFromState }: { comments: CommentWithAuthor[]; userId: string, removeCommentFromState : (commentId: string) => void }) => {
	const reversedComments = [...comments].reverse();

	return (
		<ul>
			{reversedComments.map(comment => (
				<Comment comment={comment} key={comment.id} userId={userId} removeCommentFromState = {removeCommentFromState}/>
			))}
		</ul>
	);
};

export default CommentsContainer;
