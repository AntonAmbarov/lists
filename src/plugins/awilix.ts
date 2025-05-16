import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass, asFunction } from "awilix";
import { FastifyPluginAsync } from "fastify";
import { CardRepository } from "../modules/card/cards.repository";
import { CardService } from "../modules/card/cards.service";
import fp from "fastify-plugin";
import { PrismaService } from "../modules/database/prisma.service";

export const awilixPlugin: FastifyPluginAsync = fp(async (app) => {
    app.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true,
        strictBooleanEnforced: true,
    })

    diContainer.register({
        prisma: asClass(PrismaService).singleton(),
        cardRepository: asClass(CardRepository).singleton(),
        cardService: asClass(CardService).singleton(),
        log: asFunction(() => app.log).singleton(),
    });
});