import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AutoLoad from '@fastify/autoload';
import config from './configs/config';
import { serverOpts } from './configs/serverOptions'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server: FastifyInstance = Fastify(serverOpts).withTypeProvider<TypeBoxTypeProvider>();

await server.register(config);
server.log.info('Конфиг сервера загружен %o', server.config);

server.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  ignorePattern: /.*.no-load\.js/,
  indexPattern: /^index$/i,
  options: server.config.server, //обращаемся к декоратору из .configs/config
});

server.register(AutoLoad, {
  dir: path.join(__dirname, 'modules'),
  indexPattern: /.*routes(\.js)$/i,
  // ignorePattern: /.*\.ts/,
  autoHooksPattern: /.*hooks(\.js)$/i,
  autoHooks: true,
  cascadeHooks: true,
  options: {}
});

const start = async () => {
  try {
    await server.listen({
      port: server.config?.server?.port,
    });
    server.log.info('Сервер запущен')
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();