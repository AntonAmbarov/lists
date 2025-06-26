import { RatingModel } from '@prisma/client';
import { IVoteRepository } from './vote.repository.interface';
import { RatingDTO, RatingResponse, VoteInput } from './vote.schema';
import { IVoteService } from './vote.service.interface';

export class VoteService implements IVoteService {
	private voteRepository: IVoteRepository;

	constructor({ voteRepository }: { voteRepository: IVoteRepository }) {
		this.voteRepository = voteRepository;
	}

	// /toRatingResponse(data) {

	// }

	async addVote({ cardToListId, vote, authorId }: VoteInput): Promise<RatingModel> {
		await this.voteRepository.createVote({
			cardToListId: cardToListId,
			value: vote === 'UP' ? 1 : -1,
			authorId: authorId,
		});

		return await this.updateRating(cardToListId);
	}

	async updateRating(cardToListId: number): Promise<RatingModel> {
		const votes = await this.voteRepository.findVotes(cardToListId);
		const value = votes.reduce((sum, vote) => vote.value + sum, 0);
		return await this.voteRepository.upsertRating(cardToListId, value);
	}

	async getRating(cardToListId: number): Promise<RatingDTO | null> {
		return await this.voteRepository.findRating(cardToListId);
	}
}
