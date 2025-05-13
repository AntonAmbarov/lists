import { ICardRepostory } from "./types/cards.repository.intrerface";
import { ICard } from "./types/card.dto";
import { IDatabase } from '../../types/shared/db';


export class CardRepository implements ICardRepostory {
    constructor(private dataBase: IDatabase) {
        this.dataBase = dataBase;
    }

    create(value: ICard): void {
        const { cards } = this.dataBase;
        cards.push(value);
    };

    getAll(): Array<ICard> {
        return this.dataBase.cards;
    };

    update(id: number, value: ICard): void {
        const cardIndex = this.dataBase.cards.findIndex((card: ICard): boolean => id === card.id);

        if (cardIndex === -1) {
            throw new Error('Карточка не найдена');
        }

        this.dataBase.cards[cardIndex] = value;
    };

    delete(id: number): void {
        const { cards } = this.dataBase;
        const currentCards = cards.filter((card: ICard): boolean => id !== card.id);
        this.dataBase.cards = currentCards;
    };
}