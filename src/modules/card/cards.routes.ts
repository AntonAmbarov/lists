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
        throw new Error('тестовая ошибка')
    })
}