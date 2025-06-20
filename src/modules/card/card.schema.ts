import { Type, Static } from '@sinclair/typebox';
import { STATUS } from '../../shared/constants/constants';

export const CardSchema = Type.Object({
	title: Type.String(),
	img: Type.Optional(Type.String()),
	description: Type.Optional(Type.String()),
	author: Type.Number(),
	status: Type.Union(STATUS.map((s) => Type.Literal(s))),
	externalId: Type.String(),
	// metadata: Type.Optional(
	//     Type.Tuple([
	//         Type.String(),
	//         Type.String(),
	//     ])
	// ),
});

export const CreateCardInputSchema = Type.Object({
	...CardSchema.properties,
});

export const CreateCardResponseSchema = Type.Required(CardSchema);

export const GetCardResponseSchema = Type.Object({
	id: Type.Number(),
	createdAt: Type.Date(),
	updatedAt: Type.Date(),
	title: Type.String(),
	img: Type.Union([Type.String(), Type.Null()]),
	description: Type.Union([Type.String(), Type.Null()]),
	author: Type.Number(),
	status: Type.Union(STATUS.map((s) => Type.Literal(s))),
	externalId: Type.Union([Type.String(), Type.Null()]),
});
// input для get cards
// response для get cards
// input для get по id
// response для get по id

export type CreateCardInput = Static<typeof CreateCardInputSchema>;
export type CreateCardResponse = Static<typeof CreateCardResponseSchema>;
