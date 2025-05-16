import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { CardSchema } from "./types/cards.schema";
import { ICardService } from './types/cards.service.interface';
import { CardDTO } from "./types/cards.schema";
import { CardModel } from "@prisma/client";

export const cardRoutes = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    app.get('/cards', {
        schema: CardSchema
    }, async (req, reply) => {
        const service: ICardService = app.diContainer.resolve('cardService');
        const data: Array<CardModel> = await service.getCards();

        reply.status(200).send(data);
    })

    app.post('/cards', async (req, reply) => {
        const service: ICardService = app.diContainer.resolve('cardService');
        const data = req.body as CardDTO;
        app.log.info(data);
        service.addCard(data)
    })
}