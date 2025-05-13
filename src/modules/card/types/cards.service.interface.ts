import { ICard } from "./card.dto";

export interface ICardService {
    getCards: () => Array<ICard>;
}