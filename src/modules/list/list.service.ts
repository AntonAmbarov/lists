import { ListsCardsModel, ListModel, CardModel } from "@prisma/client";
import { IListRepository } from "./list.repository.interface";
import { CreateListInput } from "./list.schema";
import { IListService } from "./list.service.interface";
import { ERRORS } from "../errors/error.helper";

export class ListService implements IListService {
    private listRepository: IListRepository;

    constructor({ listRepository }: { listRepository: IListRepository }) {
        this.listRepository = listRepository;
    };

    async addList(input: CreateListInput): Promise<ListModel> {
        const res = await this.listRepository.create(input);
        return res;
    };

    async getList(listId: number): Promise<ListModel> {
        const list = await this.listRepository.findOne(listId);

        if (!list) {
            throw ERRORS.listNotExists;
        }

        return list;
    };

    async getCardsByList(listId: number): Promise<Array<ListsCardsModel>> {
        const cards = await this.listRepository.findCardsByList(listId);
        return cards;
    };

    async addCardToList(listId: number, cardId: number): Promise<ListsCardsModel> {
        return await this.listRepository.createListCardRelation(listId, cardId);
    }
}