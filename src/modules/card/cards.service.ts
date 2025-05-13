// import { MockData } from "../../db/mockData";
import { ICard } from "./types/card.dto";
import { ICardService } from "./types/cards.service.interface";
import { ICardRepostory } from "./types/cards.repository.intrerface";

export class CardService implements ICardService {
    private cardRepository: ICardRepostory;

    constructor({ cardRepository }: { cardRepository: ICardRepostory }) {
        this.cardRepository = cardRepository;
    }

    getCards(): Array<ICard> {
        return this.cardRepository.getAll();
    }
}