import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";

export const listRoute = (app: FastifyInstance, opts: FastifyPluginOptions) => {

    app.get('/', {
        schema: {

        }
    }, (req, reply) => {

    })

}