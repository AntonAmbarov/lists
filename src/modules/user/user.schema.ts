import { Static, Type } from '@sinclair/typebox';
import { ROLE } from '../../shared/constants/constants';

export const UserSchema = Type.Object({
	username: Type.String(),
	email: Type.String({
		format: 'email',
	}),
	password: Type.String(),
});

export const CreateUserInputSchema = Type.Required(UserSchema);

export const LoginUserInputSchema = Type.Omit(UserSchema, ['username']);

export const CreateUserResponseSchema = Type.Omit(UserSchema, ['password']);

export const LoginUserResponseSchema = Type.Object({
	token: Type.String(),
	role: Type.Union(ROLE.map((r) => Type.Literal(r))),
});

export type CreateUserInput = Static<typeof CreateUserInputSchema>;
export type LoginUserInput = Static<typeof LoginUserInputSchema>;
export type CreateUserResponse = Static<typeof CreateUserResponseSchema>;
export type LoginUserResponce = Static<typeof LoginUserResponseSchema>;
