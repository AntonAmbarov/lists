import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import config from './configs/config';
import { serverOpts } from './configs/serverOptions'
import { corsPlugin } from './plugins/cors';
import { setErrorHandlerPlugin } from './plugins/_error-handler';
import { cardRoutes } from './modules/card/cards.routes';
// import awilixPlugin from './plugins/awilix';
import { fastifyAwilixPlugin } from "@fastify/awilix";
import { createContainer } from './common/container';
import { diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import { CardRepository } from "../src/modules/card/cards.repository";
import { DataBase } from "../src/db/mockData";
import { CardService } from "../src/modules/card/cards.service";

const app: FastifyInstance = Fastify(serverOpts).withTypeProvider<TypeBoxTypeProvider>();

// Загрузка конфигурации
await app.register(config).after(() => app.log.info('Конфиг сервера загружен %o', app.config));

// Регистрация плагинов
app.register(corsPlugin);
// app.register(awilixPlugin);
app.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
  strictBooleanEnforced: true
})

// Создание DI контейнера

// await createContainer(app);
diContainer.register({
  dataBase: asClass(DataBase).singleton(),
  cardRepository: asClass(CardRepository).singleton(),
  cardService: asClass(CardService).singleton(),
});

// Обработка ошибок
app.setErrorHandler((err, req, reply) => {
  setErrorHandlerPlugin(app, err, req, reply)
});

// Регистрация роутов
await app.register(cardRoutes);

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