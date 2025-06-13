import { ListModel, ListsCardsModel, Prisma, CardModel } from "@prisma/client";
import { IPrismaService } from "../database/prisma.service.interface";
import { IListRepository } from "./list.repository.interface";
import { CreateListInput } from "./list.schema";

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
            author: { connect: { id: input.author } },
            // category: { connect: { id: input.category } },
            status: input.status
        };

        const resp = await this.prisma.client.listModel.create({ data });
        return resp;
    }

    findOne(listId: number): Promise<ListModel | null> {
        return this.prisma.client.listModel.findUnique({
            where: { id: listId },
        })
    }

    findCardsByList(listId: number): Promise<Array<ListsCardsModel & { card: CardModel }>> {
        return this.prisma.client.listsCardsModel.findMany({
            where: {
                listId
            },
            include: {
                card: true,
            }
        })
    }
}