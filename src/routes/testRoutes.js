export default async function (app, _opts) {
    app.get('/', (req, reply) => {
        req.log.info('Обработчик вызван');
        reply.send({ status: 'Я живой' });
    })
}