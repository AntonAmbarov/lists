import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AutoLoad from '@fastify/autoload';
import config from './configs/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server: FastifyInstance = Fastify({
  logger: { level: 'info' }
}).withTypeProvider<TypeBoxTypeProvider>();

// server.register(AutoLoad, {
//   dir: path.join(__dirname, 'schemas'),
//   indexPattern: /^loader.js$/i
// });

await server.register(config);
server.log.info('Config loaded %o', server.config);

server.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  ignorePattern: /.*.no-load\.js/,
  indexPattern: /^index$/i,
  options: server.config, //обращаемся к декоратору из .configs/config
});

server.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  indexPattern: /.*routes(\.js|\.cjs)$/i,
  ignorePattern: /.*\.js/,
  autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
  autoHooks: true,
  cascadeHooks: true,
  options: {}
});

const start = async () => {
  try {
    await server.listen({
      port: server.config?.PORT,
      // host: server.config?.HOST,
    });
    console.log(`Server running`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();