import { ListModel } from "@prisma/client";
import { IPrismaService } from "../database/prisma.service.interface";
import { CreateListInput } from "./list.schema";

export interface IListRepository {
    create: (input: CreateListInput) => Promise<ListModel>;
    getOne: (listId: number) => Promise<Array<ListModel>>;
    getMany: (categoryId: number | null) => Promise<Array<ListModel>>;
};