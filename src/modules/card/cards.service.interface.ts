import { CardModel } from "@prisma/client";
import { CardDTO } from "./cards.schema";

export interface ICardService {
    getCards: () => Promise<Array<CardModel>>;

    addCard: (data: CardDTO) => Promise<CardModel>;
}