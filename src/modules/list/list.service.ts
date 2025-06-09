import { ListModel } from "@prisma/client";
import { IListRepository } from "./list.repository.interface";
import { CreateListInput } from "./list.schema";
import { IListService } from "./list.service.interface";

export class ListService implements IListService {
    constructor(private listRepository: IListRepository) {
        this.listRepository = listRepository;
    };

    async addList(input: CreateListInput): Promise<ListModel> {
        return await this.listRepository.create(input);
    };

    getList(listId: number): Promise<Array<ListModel>> {
        throw new Error("Method not implemented.");
    };

    getLists(categoryId: number | null): Promise<Array<ListModel>> {
        throw new Error("Method not implemented.");
    };
}