import { Status } from "../shared/status";

export interface ICardData {
    id: number,
    title: string,
    img: string,
    description: string,
    author: string,
    status: Status,
    metadate?: [][],
}

export interface ICard extends ICardData {

} 