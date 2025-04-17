import fp from 'fastify-plugin';

export default fp(
    function (app, _opts) {
        app.setErrorHandler((err, req, reply) => {
            if (reply.statusCode >= 500) {
                req.log.error({ req, res: reply, err: err }, err?.message);
                reply.send(`Фатальная ошибка. Id ${req.id}`);
                return;
            }
            req.log.info({ req, res: reply, err: err }, err?.message);
            reply.send(err);
        });
    });