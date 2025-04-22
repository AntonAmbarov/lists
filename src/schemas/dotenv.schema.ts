import { Type } from "@sinclair/typebox";

export const schemaDotenv = Type.Object({
    NODE_ENV: Type.String({ default: 'development' }),
    PORT: Type.Integer({ default: 3000 }),
    DB_URL: Type.String()
}, {
    $id: 'schema:dotenv',
    additionalProperties: false
});