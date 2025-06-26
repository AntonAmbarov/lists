import { RatingModel } from '@prisma/client';
import { RatingDTO, VoteInput } from './vote.schema';

export interface IVoteService {
	addVote: (input: VoteInput) => Promise<RatingModel>;
	updateRating: (cardToListId: number) => Promise<RatingModel>;
	getRating: (cardToListId: number) => Promise<RatingDTO | null>;
}
