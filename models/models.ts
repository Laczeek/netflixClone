import { Comment, Genre, Production, User } from '@prisma/client';

export type GenresWithProductions = (Genre & { productions: Production[] })[];
export type CommentWithAuthor = Comment & { author: User };
export type ProductionWithComments = Production & { comments: CommentWithAuthor[] };
