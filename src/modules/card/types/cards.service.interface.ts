import { ICard } from "./card.dto";

export default interface ICardService {
    getCards: () => Array<ICard>;
}