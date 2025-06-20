import { ICardRepostory } from './card.repository.intrerface';
import { CreateCardInput } from './card.schema';
import { IPrismaService } from '../database/prisma.service.interface';
import { CardModel, Prisma } from '@prisma/client';

export class CardRepository implements ICardRepostory {
	private prisma: IPrismaService;

	constructor({ prisma }: { prisma: IPrismaService }) {
		this.prisma = prisma;
	}

	async create(inputData: CreateCardInput): Promise<CardModel> {
		const data: Prisma.CardModelCreateInput = {
			title: inputData.title,
			img: inputData.img || null,
			description: inputData.description || null,
			author: { connect: { id: inputData.author } },
			status: inputData.status,
			externalId: inputData.externalId,
		};

		const response = await this.prisma.client.cardModel.create({ data });
		return response;
	}

	async getAll(): Promise<Array<CardModel>> {
		return this.prisma.client.cardModel.findMany();
	}

	async update(id: number, value: CreateCardInput): Promise<void> {}

	async delete(id: number): Promise<void> {}
}
