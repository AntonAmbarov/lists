// import { MockData } from "../../db/mockData";
import { ICard } from "./types/card.dto";
// import { CardRepository } from "./cards.repository";
import ICardService from "./types/cards.service.interface";
import { ICardRepostory } from "./types/cards.repository.intrerface";

export class CardService implements ICardService {
    constructor(
        private cardRepository: ICardRepostory
    ) {
        this.cardRepository = cardRepository;
    }

    getCards(): Array<ICard> {
        return this.cardRepository.getAll();
    }
}