import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export const setErrorHandlerPlugin = (app: FastifyInstance, err: FastifyError, req: FastifyRequest, reply: FastifyReply) => {

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
    } else if (statusCode === 500) {
        console.log('Статус 500')
    }

    const response = {
        error: {
            code: statusCode,
            message,
            details: validation
        }
    }

    reply.status(statusCode).send(response);
};
