import { ListModel, ListsCardsModel } from "@prisma/client";
import { CreateListInput } from "./list.schema";

export interface IListRepository {
    create: (input: CreateListInput) => Promise<ListModel>;
    findOne: (listId: number) => Promise<ListModel | null>;
    findCardsByList: (listId: number) => Promise<Array<ListsCardsModel>>;
    createListCardRelation: (listId: number, cardId: number) => Promise<ListsCardsModel>;
};