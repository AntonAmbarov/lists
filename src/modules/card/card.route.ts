import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify"
import { CardSchema, CreateCardInputSchema, CreateCardResponseSchema } from "./card.schema";
import { ICardService } from './card.service.interface';
import { CreateCardInput, CreateCardResponse } from "./card.schema";
import { CardModel } from "@prisma/client";

export const cardRoute = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    const service: ICardService = app.diContainer.resolve('cardService');

    app.post('/', {
        schema: {
            body: CreateCardInputSchema,
            response: {
                201: CreateCardResponseSchema
            }
        }
    }, async (req: FastifyRequest<{ Body: CreateCardInput }>, reply) => {
        const data = req.body;
        app.log.info(data); // log
        await service.addCard(data);
        reply.code(201).send(data);
    });

    app.get('/', {
        schema: CardSchema
    }, async (req, reply) => {
        const data: Array<CardModel> = await service.getCards();
        reply.status(200).send(data);
    });

    app.get('/:id', async (req, peply) => {
        // логика
    });
}