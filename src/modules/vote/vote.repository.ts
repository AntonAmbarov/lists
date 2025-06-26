import { VoteModel, RatingModel } from '@prisma/client';
import { IPrismaService } from '../database/prisma.service.interface';
import { IVoteRepository } from './vote.repository.interface';

export class VoteRepository implements IVoteRepository {
	private prisma: IPrismaService;

	constructor({ prisma }: { prisma: IPrismaService }) {
		this.prisma = prisma;
	}

	async createVote(data: {
		cardToListId: number;
		value: number;
		authorId: number;
	}): Promise<VoteModel> {
		return await this.prisma.client.voteModel.create({ data });
	}

	async createRating(cardToListId: number, value: number): Promise<RatingModel> {
		const data = {
			cardToList: { connect: { id: cardToListId } },
			value: value,
		};

		return await this.prisma.client.ratingModel.create({ data });
	}

	async findVotes(cardToListId: number): Promise<Array<VoteModel>> {
		return await this.prisma.client.voteModel.findMany({
			where: { cardToListId: cardToListId },
		});
	}

	async findRating(cardToListId: number): Promise<RatingModel | null> {
		return await this.prisma.client.ratingModel.findFirst({
			where: { cardToListId: cardToListId },
		});
	}

	async upsertRating(cardToListId: number, value: number): Promise<RatingModel> {
		return await this.prisma.client.ratingModel.upsert({
			where: { cardToListId: cardToListId },
			update: { value: value },
			create: { cardToList: { connect: { id: cardToListId } }, value: value },
		});
	}
}
