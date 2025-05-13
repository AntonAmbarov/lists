import { Type } from "@sinclair/typebox";

export const cardSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
    img: Type.String(),
    description: Type.String(),
    author: Type.String(),
    status: Type.Union([
        Type.Literal('active'),
        Type.Literal('moderation')
    ]),
    metadata: Type.Optional(
        Type.Array(
            Type.Array(Type.String())
        )
    ),
})