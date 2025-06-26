import { ListModel, CardToListModel, Prisma, CardModel } from '@prisma/client';
import { IPrismaService } from '../database/prisma.service.interface';
import { IListRepository } from './list.repository.interface';
import { CreateListInput } from './list.schema';

export class ListRepository implements IListRepository {
	private prisma: IPrismaService;

	constructor({ prisma }: { prisma: IPrismaService }) {
		this.prisma = prisma;
	}

	async create(input: CreateListInput): Promise<ListModel> {
		const data: Prisma.ListModelCreateInput = {
			title: input.title,
			img: input.img || null,
			description: input.description || null,
			author: { connect: { id: input.authorId } },
			// category: { connect: { id: input.category } },
			status: input.status,
		};

		const resp = await this.prisma.client.listModel.create({ data });
		return resp;
	}

	async findOne(listId: number): Promise<ListModel | null> {
		return await this.prisma.client.listModel.findUnique({
			where: { id: listId },
		});
	}

	async findCardsByList(listId: number): Promise<Array<CardToListModel & { card: CardModel }>> {
		return await this.prisma.client.cardToListModel.findMany({
			where: {
				listId,
			},
			include: {
				card: true,
			},
		});
	}

	async createListCardRelation(listId: number, cardId: number): Promise<CardToListModel> {
		const data = { listId, cardId };

		return await this.prisma.client.cardToListModel.create({ data });
	}
}
