// import { routeHandler } from "../../types/routes";
import fp from 'fastify-plugin';

export default fp(async (app, opts) => {
    app.post('/cards', (req, reply) => {
        req.log.info('Роут cards')
        app.log.info('Еще тест лога но через app.log')
        reply.send('Ответ роута /cards')
    })
})