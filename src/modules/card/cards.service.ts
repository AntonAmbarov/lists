import { ICardService } from "./cards.service.interface";
import { ICardRepostory } from "./cards.repository.intrerface";
import { CardModel } from "@prisma/client";
import { CardDTO } from "./cards.schema";

export class CardService implements ICardService {
    private cardRepository: ICardRepostory;

    constructor({ cardRepository }: { cardRepository: ICardRepostory }) {
        this.cardRepository = cardRepository;
    }

    async getCards(): Promise<Array<CardModel>> {
        return this.cardRepository.getAll();
    }

    async addCard(data: CardDTO): Promise<CardModel> {
        return this.cardRepository.create(data);
    }
}