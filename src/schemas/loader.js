import fp from 'fastify-plugin';
import dotenv from './dotenv.json' assert { type: 'json' };

export default fp(function schemasLoader(app, _opts) {
    app.addSchema(dotenv);
});