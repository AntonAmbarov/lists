import { CreateListInput } from './list.schema';
import { CardToListModel, ListModel } from '@prisma/client';

export interface IListService {
	addList: (input: CreateListInput) => Promise<ListModel>;
	getList: (listId: number) => Promise<ListModel | null>;
	getCardsByList: (listId: number) => Promise<Array<CardToListModel>>;
	addCardToList: (listId: number, cardId: number) => Promise<CardToListModel>;
}
