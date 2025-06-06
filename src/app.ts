import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import config from './configs/config';
import { serverOpts } from './configs/serverOptions'
import { corsPlugin } from './plugins/cors';
import { errorHandlerPlugin } from './plugins/errorHandlerPlugin';
import { cardRoute } from './modules/card/card.route';
import { awilixPlugin } from './plugins/awilix';
import { databaseConnecting } from './plugins/database';
import { userRoute } from './modules/user/user.route';

const app: FastifyInstance = Fastify(serverOpts).withTypeProvider<TypeBoxTypeProvider>();

// Загрузка конфигурации
await app.register(config).after(() => app.log.info('Конфиг сервера загружен %o', app.config));

// Регистрация плагинов
await app.register(corsPlugin);
await app.register(awilixPlugin);
await app.register(databaseConnecting);
await app.register(errorHandlerPlugin);

// Регистрация роутов
await app.register(cardRoute, { prefix: 'api/cards' });
await app.register(userRoute, { prefix: 'api/users' });

// Root rout
app.get('/', (req, reply) => {
  reply.status(200).send({ message: 'Привет. Все ОК!' })
});

// Старт сервера
const start = async () => {
  try {
    await app.listen({
      port: app.config?.port,
    });
    app.log.info('Сервер запущен');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();