import { CardModel } from "@prisma/client";
import { CreateCardInput } from "./card.schema";

export interface ICardService {
    getCards: () => Promise<Array<CardModel>>;
    addCard: (inputData: CreateCardInput) => Promise<CardModel>;
}