import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass, asFunction } from "awilix";
import { FastifyPluginAsync } from "fastify";
import { CardRepository } from "../modules/card/card.repository";
import { CardService } from "../modules/card/card.service";
import fp from "fastify-plugin";
import { PrismaService } from "../modules/database/prisma.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";

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
        userRepository: asClass(UserRepository).singleton(),
        userService: asClass(UserService).singleton(),
        log: asFunction(() => app.log).singleton(),
    });
});