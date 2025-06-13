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
        const card = await this.listRepository.findOne(listId);

        if (!card) {
            throw ERRORS.listNotExists;
        }

        return card;
    };

    async getCardsByList(listId: number): Promise<Array<ListsCardsModel & { card: CardModel }>> {
        const cards = await this.listRepository.findCardsByList(listId);
        return cards;
    }
}