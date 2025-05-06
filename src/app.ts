import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import config from './configs/config';
import { serverOpts } from './configs/serverOptions'
import { corsPlugin } from './plugins/cors';
import { setErrorHandlerPlugin } from './plugins/error-handler';
import { cardRoutes } from './modules/card/cards.routes';

const app: FastifyInstance = Fastify(serverOpts).withTypeProvider<TypeBoxTypeProvider>();

// Регистрация плагинов
await app.register(config);
app.log.info('Config loaded %o', app.config);
app.register(corsPlugin);
app.register(setErrorHandlerPlugin);

// Регистрация роутов
app.register(cardRoutes, { prefix: 'api/card' });

// Root rout
app.get('/', (req, reply) => {
  reply.status(200).send({ message: 'Привет. Все ОК!' })
})

app.get('/cards', (req, reply) => {
  req.log.info('Роут cards')
  app.log.info('Еще тест лога но через app.log')
  reply.status(200).send('Ответ роута /cards')
})

// Старт сервера

const start = async () => {
  try {
    await app.listen({
      port: app.config?.port,
    });
    console.log(`Server running`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();