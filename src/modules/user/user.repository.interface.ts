import { Prisma, UserModel } from "@prisma/client";
import { CreateUserInput } from "./user.schema";

export interface IUserRepository {
    create(input: CreateUserInput): Promise<UserModel>;
    findByEmail(email: string): Promise<UserModel | null>
}