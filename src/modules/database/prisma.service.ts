import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "./prisma.service.interface";
import { FastifyBaseLogger } from "fastify";

export class PrismaService implements IPrismaService {
    client: PrismaClient;
    // private log: FastifyBaseLogger; //логгер не инициализируется корректно

    constructor() {
        this.client = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    async connect(): Promise<void> {
        try {
            // this.log.info('Подключение к БД')
            await this.client.$connect();

        } catch (error) {
            // this.log.error('Ошибка подключения к БД');
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect();
    }
}