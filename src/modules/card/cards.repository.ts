import { ICardRepostory } from "./types/cards.repository.intrerface";
import { CardDTO } from "./types/cards.schema";
import { IPrismaService } from '../database/prisma.service.interface';
import { CardModel } from "@prisma/client";

export class CardRepository implements ICardRepostory {
    private prisma: IPrismaService;

    constructor({ prisma }: { prisma: IPrismaService }) {
        this.prisma = prisma;
    }

    async create(date: CardDTO): Promise<CardModel> {
        return this.prisma.client.cardModel.create({
            data: {
                title: 'Первая карточка',
                img: '/img/1.jpg',
                description: 'Детальное описание на несколько строк',
                // authorId: 1,
                status: 'MODERATION'
            }
        });
    };

    async getAll(): Promise<Array<CardModel>> {
        return this.prisma.client.cardModel.findMany();
    };

    async update(id: number, value: CardDTO): Promise<void> { };

    async delete(id: number): Promise<void> { };
}