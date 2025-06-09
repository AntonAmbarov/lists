import { ICardService } from "./card.service.interface";
import { ICardRepostory } from "./card.repository.intrerface";
import { CardModel } from "@prisma/client";
import { CreateCardInput } from "./card.schema";

export class CardService implements ICardService {
    private cardRepository: ICardRepostory;

    constructor({ cardRepository }: { cardRepository: ICardRepostory }) {
        this.cardRepository = cardRepository;
    }

    async getCards(): Promise<Array<CardModel>> {
        return this.cardRepository.getAll();
    }

    async addCard(inputData: CreateCardInput): Promise<CardModel> {
        const response = await this.cardRepository.create(inputData);
        return response;
    }
}