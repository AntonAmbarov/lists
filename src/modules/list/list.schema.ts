import { Type } from "@sinclair/typebox";
import { STATUS } from "../../shared/constants/constants";

const id = Type.Number({ minimum: 1 });

export const ListSchema = Type.Object({
    title: Type.String(),
    img: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    authot: Type.Number(),
    category: Type.Number(),
    status: Type.Union(STATUS.map(s => Type.Literal(s)))
});

export const CreateListInputSchema = Type.Object({
    ...ListSchema.properties
});

export const CreateListResponseSchema = Type.Intersect([id, ListSchema]);

export const GetListsInputSchema = Type.Object({
    id
});

export const GetListsResponseSchema = Type.Array(Type.Object({
    id,
    ...ListSchema.properties
}));