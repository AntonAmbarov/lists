import { ListModel, ListCardsModel } from "@prisma/client";
import { CreateListInput } from "./list.schema";

export interface IListRepository {
    create: (input: CreateListInput) => Promise<ListModel>;
    findOne: (listId: number) => Promise<ListModel | null>;
    findCardsByList: (listId: number) => Promise<Array<ListCardsModel>>
};