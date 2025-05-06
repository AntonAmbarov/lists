import { ICard } from "../../types/domain/Card";
import { Status } from "../../types/shared/status";

export class Card implements ICard {
    constructor(
        public id: number,
        public title: string,
        public img: string,
        public description: string,
        public author: string,
        public status: Status,
        public metadate?: [][],
    ) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.description = description;
        this.author = author;
        this.status = status;
        this.metadate = metadate;
    }
}