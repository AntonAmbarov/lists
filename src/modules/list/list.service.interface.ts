import { IListRepository } from "./list.repository.interface";
import { CreateListInput } from "./list.schema";
import { ListModel } from "@prisma/client";

export interface IListService {
    addList: (input: CreateListInput) => Promise<ListModel>;
    getList: (listId: number) => Promise<Array<ListModel>>;
    getLists: (categoryId: number | null) => Promise<Array<ListModel>>;
}