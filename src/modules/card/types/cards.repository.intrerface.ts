import { ICard } from "./card.dto";

export interface ICardRepostory {
    create: (value: ICard) => void,
    getAll: () => Array<ICard>,
    update: (id: number, value: ICard) => void,
    delete: (id: number) => void,
}