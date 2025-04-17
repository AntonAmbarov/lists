import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import AutoLoad from '@fastify/autoload';
import config from './configs/config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (app, opts) {
  app.register(AutoLoad, {
    dir: path.join(__dirname, 'schemas'),
    indexPattern: /^loader.js$/i
  })

  await app.register(config);
  app.log.info('Config loaded %o', app.config);

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^index$/i,
    options: app.config, //обращаемся к декоратору из .configs/config.js
  })

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true,
    options: { ...opts }
  })
}