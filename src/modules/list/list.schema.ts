import { Type, Static } from '@sinclair/typebox';
import { STATUS } from '../../shared/constants/constants';
import { GetCardResponseSchema } from '../card/card.schema';

const prismaFields = Type.Object({
	createdAt: Type.String(),
	updatedAt: Type.String(),
});

export const ListSchema = Type.Object({
	title: Type.String(),
	img: Type.Optional(Type.String()),
	description: Type.Optional(Type.String()),
	authorId: Type.Number(),
	// category: Type.Number(),
	status: Type.Union(STATUS.map((s) => Type.Literal(s))),
});

export const CreateListInputSchema = Type.Object({
	...ListSchema.properties,
});

export const CreateListResponseSchema = Type.Object({
	id: Type.Number({ minimum: 1 }),
	...ListSchema.properties,
});

export const GetListsInputSchema = Type.Object({
	id: Type.Number({ minimum: 1 }),
});

export const GetListByIdParamsSchema = Type.Object({
	id: Type.Number({ minimum: 1 }),
});

export const GetListByIdResponseSchema = Type.Object({
	id: Type.Number({ minimum: 1 }),
	...prismaFields.properties,
	...ListSchema.properties,
});

export const GetCardsByListIdParamsSchema = Type.Object({
	id: Type.Number({ minimum: 1 }),
});

export const GetCardsByListIdResponseSchema = Type.Object({
	cards: Type.Array(
		Type.Object({
			createdAt: Type.Date(),
			updatedAt: Type.Date(),
			id: Type.Number(),
			listId: Type.Number(),
			cardId: Type.Number(),
			card: Type.Object({
				...GetCardResponseSchema.properties,
			}),
		}),
	),
});

export const AddCardToListParamsSchema = Type.Object({
	listId: Type.Number({ minimum: 1 }),
	cardId: Type.Number({ minimum: 1 }),
});

export const AddCardToListResponseSchema = Type.Object({
	id: Type.Number({ minimum: 1 }),
});

export type CreateListInput = Static<typeof CreateListInputSchema>;

export type CreateListResponse = Static<typeof CreateListResponseSchema>;

export type GetListByIdResponse = Static<typeof GetListByIdResponseSchema>;

export type GetListByIdParams = Static<typeof GetListByIdParamsSchema>;

export type GetCardsByListIdParams = Static<typeof GetCardsByListIdParamsSchema>;

export type AddCardToListParams = Static<typeof AddCardToListParamsSchema>;
