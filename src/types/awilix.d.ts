import { MockData } from "../db/mockData";
import { ICardRepostory } from "../modules/card/types/cards.repository.intrerface";
import ICardService from "../modules/card/types/cards.service.interface";

declare module '@fastify/awilix' {
    interface Cradle {
        dataBase: MockData,
        cardRepository: ICardRepostory,
        cardService: ICardService,
    }
    // interface RequestCradle {}
};
