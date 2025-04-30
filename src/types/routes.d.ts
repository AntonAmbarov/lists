import { FastifyInstance, FastifyPluginOptions } from "fastify"

export type routeHandler = (
    app: FastifyInstance,
    opts?: FastifyPluginOptions & {
        prefix: string
    }
) => void;