import { Type, Static } from '@sinclair/typebox';
import { VOTE } from '../../shared/constants/constants';

const VoteSchema = Type.Object({
	cardToListId: Type.Number({ minimum: 1 }),
	authorId: Type.Number({ minimum: 1 }),
	vote: Type.Union(VOTE.map((v) => Type.Literal(v))),
});

const RatingSchema = Type.Object({
	value: Type.Number(),
	updateAt: Type.Date(),
	createAt: Type.Date(),
	cardToListId: Type.Number({ minimum: 1 }),
});

export const RatingParamsSchema = Type.Object({
	id: Type.Number(),
});

export const VoteInputSchema = Type.Object({
	...VoteSchema.properties,
});

export const RatingResponseSchema = Type.Object({
	...RatingSchema.properties,
});

export type VoteInput = Static<typeof VoteInputSchema>;
export type RatingDTO = Static<typeof RatingSchema>;
export type RatingResponse = Static<typeof RatingResponseSchema>;
export type RatingParams = Static<typeof RatingParamsSchema>;
