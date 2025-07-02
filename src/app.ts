import config from './configs/config';
import { corsPlugin } from './plugins/cors';
import { errorHandlerPlugin } from './plugins/errorHandlerPlugin';
import { cardRoute } from './modules/card/card.route';
import { createContainer } from './configs/diContainer';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import { databaseConnecting } from './plugins/database';
import { userRoute } from './modules/user/user.route';
import { listRoute } from './modules/list/list.route';
import { voteRoute } from './modules/vote/vote.route';
import { jwtPlugin } from './plugins/jwt';
import { decorators } from './configs/decorator';
import { auth } from './plugins/auth';

export default async function createApp(): Promise<void> {
	const app = await createContainer();

	// Загрузка конфигурации
	await app.register(config).after(() => app.log.info('Конфиг сервера загружен %o', app.config));

	// Регистрация плагинов
	await app.register(corsPlugin);
	await app.register(fastifyAwilixPlugin);
	await app.register(databaseConnecting);
	await app.register(errorHandlerPlugin);
	await app.register(jwtPlugin);
	await app.register(decorators);
	await app.register(auth);

	// Регистрация роутов
	await app.register(cardRoute, { prefix: 'api/cards' });
	await app.register(userRoute, { prefix: 'api/users' });
	await app.register(listRoute, { prefix: 'api/lists' });
	await app.register(voteRoute, { prefix: 'api/votes' });

	// Root rout
	app.get('/', (req, reply) => {
		reply.status(200).send({ message: 'Привет. Все ОК!' });
	});

	// Старт сервера
	try {
		await app.listen({
			port: app.config?.port,
		});
		app.log.info('Сервер запущен');
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

await createApp();
