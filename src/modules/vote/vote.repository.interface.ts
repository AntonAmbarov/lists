import { Vote } from '../../shared/types/vote';
import { RatingModel, VoteModel } from '@prisma/client';

export interface IVoteRepository {
	createVote: (input: {
		cardToListId: number;
		value: number;
		authorId: number;
	}) => Promise<VoteModel>;
	createRating: (idRelation: number, value: number) => Promise<RatingModel>;
	findVotes: (idRelation: number) => Promise<Array<VoteModel>>;
	findRating: (idRelation: number) => Promise<RatingModel | null>;
	upsertRating: (id: number, value: number) => Promise<RatingModel>;
}
