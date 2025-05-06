import fp from 'fastify-plugin';
import { CardsReposotory } from '../modules/card/cards.repository';
import { mockData } from '../db/mockData';

export default fp(
    async (app, opts) => {
        app.decorate('diContainer', {
            cardRepositories: new CardsReposotory(mockData)
        })
    }
)