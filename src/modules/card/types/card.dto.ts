import { Status } from "../../../types/shared/status";

export interface ICard {
    id: number,
    title: string,
    img: string,
    description: string,
    author: string,
    status: Status,
    metadata?: Array<[string, string]>,
}