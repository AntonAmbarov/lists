import { fastifyAwilixPlugin } from "@fastify/awilix";
import { FastifyPluginCallback } from "fastify";

const awilixPlugin: FastifyPluginCallback = async function (app) {
    app.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true,
        strictBooleanEnforced: true
    })
}

export default awilixPlugin;