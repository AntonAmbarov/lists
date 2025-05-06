import { ICardRepostories } from "./ICardRepositories";
import { ICard } from "../../types/domain/Card";
import { IDatabase } from '../../types/shared/db';


export class CardsReposotory implements ICardRepostories {
    constructor(private db: IDatabase) {
        this.db = db;
    }

    setCard(value: ICard): void {
        const { cards } = this.db;
        cards.push(value);
    };

    getCards(): Array<ICard> {
        return this.db.cards;
    };

    updateCard(id: number, value: ICard): void {
        const cardIndex = this.db.cards.findIndex((card: ICard): boolean => id === card.id);

        if (cardIndex === -1) {
            throw new Error('Карточка не найдена');
        }

        this.db.cards[cardIndex] = value;
    };

    deleteCard(id: number): void {
        const { cards } = this.db;
        const currentCards = cards.filter((card: ICard): boolean => id !== card.id);
        this.db.cards = currentCards;
    };
}