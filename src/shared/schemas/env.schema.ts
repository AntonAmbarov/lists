import { Type } from "@sinclair/typebox";

export const envSchema = Type.Object({
    NODE_ENV: Type.String({ default: 'development' }),
    PORT: Type.Integer({ default: 3000 }),
    DATABASE_URL: Type.String(),
    LOG_LEVEL: Type.String(),
    PRIVATE_KEY: Type.String()
}, {
    $id: 'schema:dotenv',
    additionalProperties: false
});