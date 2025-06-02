import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { CreateUserInput, CreateUserInputSchema, CreateUserResponseSchema, LoginUserInput, LoginUserInputSchema, LoginUserResponseSchema } from "./users.schema";
import { IUserService } from "./user.service.interface";

export const userRoute = (app: FastifyInstance, opts: FastifyPluginOptions) => {
    const service: IUserService = app.diContainer.resolve('userService');

    app.post('/register', {
        schema: {
            body: CreateUserInputSchema,
            response: {
                201: CreateUserResponseSchema
            }
        }
    }, async (req: FastifyRequest<{ Body: CreateUserInput }>, reply) => {
        try {
            const data = req.body;
            const user = await service.createUser(data);

            reply.code(201).send(user)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
            reply.code(400).send({ error: errorMessage });
        }
    });

    app.post('/login', {
        schema: {
            body: LoginUserInputSchema,
            response: {
                200: LoginUserResponseSchema
            }
        }
    }, async (req: FastifyRequest<{ Body: LoginUserInput }>, reply) => {
        try {
            const { email, password } = req.body;
            const userData = await service.login({ email, password });

            reply.code(200).send(userData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
            reply.code(401).send({ error: errorMessage });
        }
    })
}