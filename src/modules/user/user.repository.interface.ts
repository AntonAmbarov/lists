import { Prisma, UserModel } from "@prisma/client";
import { CreateUserInput } from "./users.schema";

export interface IUserRepository {
    create(input: CreateUserInput): Promise<UserModel>;
    findByEmail(email: string): Promise<UserModel | null>
}