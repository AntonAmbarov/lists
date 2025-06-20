import { VoteModel, RatingModel } from '@prisma/client';
import { Vote } from '../../shared/types/vote';
import { IPrismaService } from '../database/prisma.service.interface';
import { IVoteRepository } from './vote.repository.interface';

export class VoteRepository implements IVoteRepository {
	private prisma: IPrismaService;

	constructor({ prisma }: { prisma: IPrismaService }) {
		this.prisma = prisma;
	}

	async createVote(idRelation: number, value: Vote, author: number): Promise<VoteModel> {
		const data = {
			cardListRelation: { connect: { id: idRelation } },
			author: { connect: { id: author } },
			value: value,
		};

		return await this.prisma.client.voteModel.create({ data });
	}

	async createRating(idRelation: number, value: number): Promise<RatingModel> {
		const data = {
			cardListRelation: { connect: { id: idRelation } },
			value: value,
		};

		return await this.prisma.client.ratingModel.create({ data });
	}

	async findVotes(idRelation: number): Promise<Array<VoteModel>> {
		return await this.prisma.client.voteModel.findMany({
			where: { listsCardsId: idRelation },
		});
	}

	async findRating(idRelation: number): Promise<RatingModel | null> {
		return await this.prisma.client.ratingModel.findFirst({
			where: { listsCardsId: idRelation },
		});
	}

	async updateRating(id: number, value: number): Promise<RatingModel> {
		return await this.prisma.client.ratingModel.update({
			where: { id },
			data: { value },
		});
	}
}
