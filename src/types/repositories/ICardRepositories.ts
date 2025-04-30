import { ICard } from "../domain/Card";

export interface ICardRepostories {
    setCard: (value: ICard) => void,
    getCards: () => Array<ICard>,
    updateCard: (id: number, value: ICard) => void,
    deleteCard: (id: number) => void,
}