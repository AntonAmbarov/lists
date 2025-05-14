import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import { FastifyPluginAsync } from "fastify";
import { CardRepository } from "../modules/card/cards.repository";
import { DataBase } from "../db/mockData";
import { CardService } from "../modules/card/cards.service";
import fp from "fastify-plugin";

export const awilixPlugin: FastifyPluginAsync = fp(async (app) => {
    app.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true,
        strictBooleanEnforced: true,
    })

    diContainer.register({
        dataBase: asClass(DataBase).singleton(),
        cardRepository: asClass(CardRepository).singleton(),
        cardService: asClass(CardService).singleton(),
    });
});