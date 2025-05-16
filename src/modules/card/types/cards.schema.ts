import { Type, Static } from "@sinclair/typebox";

export const CardSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
    img: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    authorId: Type.Number(),
    status: Type.Union([
        Type.Literal('ACTIVE'),
        Type.Literal('MODERATION')
    ]),
    // metadata: Type.Optional(
    //     Type.Tuple([
    //         Type.String(),
    //         Type.String(),
    //     ])
    // ),
})

export type CardDTO = Static<typeof CardSchema>;