import fp from 'fastify-plugin';
import { schemaDotenv } from './dotenv.schema';

export default fp(function schemasLoader(app, _opts) {
    app.addSchema(schemaDotenv);
});