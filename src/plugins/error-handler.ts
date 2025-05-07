import { FastifyPluginCallback } from 'fastify';

export const setErrorHandlerPlugin: FastifyPluginCallback =
    function (app, _opts, done) {
        app.setErrorHandler((err, req, reply) => {

            console.log('Плагин setErrorHandler')

            app.log.error({
                url: req.url,
                method: req.method,
                requestId: req.id,
                error: err.message,
                stack: err.stack,
            });

            let { statusCode = 500,
                message = `Фатальная ошибка. Id ${req.id}`,
                code,
                validation
            } = err;

            if (statusCode === 404) {
                message = `Объект не найден. Id ${req.id}`;
            } else if (code === 'FST_ERR_NOT_FOUND') {
                statusCode = 404;
                message = `Маршрут не найден. Id ${req.id}`
            } else if (validation) {
                statusCode = 400;
                message = `Ошибка валидации. Id ${req.id}`;
            }

            const response = {
                error: {
                    code: statusCode,
                    message,
                    details: validation
                }
            }


            reply.status(statusCode).send(response);
        });

        done();
    };