import { CardDTO } from "./cards.schema";
import { CardModel } from "@prisma/client";

export interface ICardRepostory {
    create: (date: CardDTO) => Promise<CardModel>,
    getAll: () => Promise<Array<CardModel>>
    update: (id: number, value: CardDTO) => Promise<void>,
    delete: (id: number) => Promise<void>,
}