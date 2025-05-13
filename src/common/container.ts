import { diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CardRepository } from "../modules/card/cards.repository";
import { MockData } from "../db/mockData";
import { CardService } from "../modules/card/cards.service";

export async function createContainer(app: FastifyInstance) {
    app.log.info('Контейнер загружен');

    diContainer.register({
        dataBase: asClass(MockData).singleton(),
        cardRepository: asClass(CardRepository).singleton(),
        cardService: asClass(CardService).singleton(),
    });

    return diContainer;
}