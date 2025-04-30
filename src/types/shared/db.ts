import { ICard } from "../domain/Card";

export interface IDatabase {
    cards: Array<ICard>;
}