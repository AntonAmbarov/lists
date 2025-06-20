import { CreateCardInput } from './card.schema';
import { CardModel } from '@prisma/client';

export interface ICardRepostory {
	create: (date: CreateCardInput) => Promise<CardModel>;
	getAll: () => Promise<Array<CardModel>>;
	update: (id: number, value: CreateCardInput) => Promise<void>;
	delete: (id: number) => Promise<void>;
}
