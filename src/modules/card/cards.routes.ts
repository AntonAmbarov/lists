import { FastifyInstance, FastifyPluginOptions } from "fastify"

export const cardRoutes = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    app.get('/cards', (req, reply) => {
        req.log.info('Роут cards')
        app.log.info('Еще тест лога но через app.log')
        reply.status(200).send('Ответ роута /cards')
    })
}