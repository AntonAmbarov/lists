import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import config from './configs/config';
import { serverOpts } from './configs/serverOptions'
import { corsPlugin } from './plugins/cors';
import { setErrorHandlerPlugin } from './plugins/_error-handler';
import { cardRoute } from './modules/card/cards.route';
import { awilixPlugin } from './plugins/awilix';
import { databaseConnecting } from './plugins/database';

const app: FastifyInstance = Fastify(serverOpts).withTypeProvider<TypeBoxTypeProvider>();

// Загрузка конфигурации
await app.register(config).after(() => app.log.info('Конфиг сервера загружен %o', app.config));

// Регистрация плагинов
await app.register(corsPlugin);
await app.register(awilixPlugin);
await app.register(databaseConnecting);

// Обработка ошибок
app.setErrorHandler((err, req, reply) => {
  setErrorHandlerPlugin(app, err, req, reply)
});

// Регистрация роутов
await app.register(cardRoute);

// Root rout
app.get('/', (req, reply) => {
  reply.status(200).send({ message: 'Привет. Все ОК!' })
})

// Старт сервера
const start = async () => {
  try {
    await app.listen({
      port: app.config?.port,
    });
    app.log.info('Сервер запущен')
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();