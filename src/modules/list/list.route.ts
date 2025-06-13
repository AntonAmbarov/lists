import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { CreateListInput, CreateListInputSchema, CreateListResponseSchema, GetCardsByListIdParams, GetCardsByListIdParamsSchema, GetCardsByListIdResponseSchema, GetListByIdParamsSchema, GetListByIdResponseSchema } from "./list.schema";
import { IListService } from "./list.service.interface";
import { ListModel } from "@prisma/client";

export const listRoute = (app: FastifyInstance, opts: FastifyPluginOptions) => {

    const service: IListService = app.diContainer.resolve('listService');

    app.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CreateListInputSchema,
            response: {
                201: CreateListResponseSchema,
            }
        },
        handler: async (req: FastifyRequest<{ Body: CreateListInput }>, reply): Promise<void> => {
            const res: ListModel = await service.addList(req.body);

            app.log.info(res)
            reply.code(201).send(res);
        }
    })

    app.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params: GetListByIdParamsSchema,
            response: {
                200: GetListByIdResponseSchema
            }
        },
        handler: async (req: FastifyRequest, reply): Promise<void> => {
            const id: number = Number(req.id);
            const res = await service.getList(id);

            reply.code(200).send(res);
        }
    });

    app.route({
        method: 'GET',
        url: '/cards/:id',
        // schema: {
        //     params: GetCardsByListIdParamsSchema,
        //     response: {
        //         200: GetCardsByListIdResponseSchema
        //     }
        // },
        handler: async (req: FastifyRequest<{ Params: GetCardsByListIdParams }>, reply): Promise<void> => {
            const res = await service.getCardsByList(req.params.id);
            reply.code(200).send(res);
        }
    });

    app.route({
        method: 'POST',
        url: '/cards',
        schema: {

        },
        handler: async (req: FastifyRequest, reply): Promise<void> => {
            // добавление карточки к списку
        }
    })
}