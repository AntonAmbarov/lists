import { FastifyInstance, FastifyPluginOptions } from "fastify"

const optsRoute = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        },

    }
}

export const cardRoutes = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    app.get('/cards', optsRoute, async (req, reply) => {
        req.log.info('Роут cards')
        reply.status(200).send({ hello: 'Привет' })
    })
}