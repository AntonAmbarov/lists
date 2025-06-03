import { Prisma, UserModel } from "@prisma/client";
import { IUserRepository } from "./user.repository.interface";
import { CreateUserInput } from "./user.schema";
import { IPrismaService } from "../database/prisma.service.interface";

export class UserRepository implements IUserRepository {
    private prisma: IPrismaService;

    constructor({ prisma }: { prisma: IPrismaService }) {
        this.prisma = prisma;
    }

    create(input: CreateUserInput): Promise<UserModel> {
        console.log('Выполняем repository: create')

        const data: Prisma.UserModelCreateInput = {
            username: input.username,
            password: input.password,
            email: input.email
        };

        return this.prisma.client.userModel.create({ data })
    }

    findByEmail(email: string): Promise<UserModel | null> {
        return this.prisma.client.userModel.findUnique({
            where: {
                email
            }
        })
    }
}