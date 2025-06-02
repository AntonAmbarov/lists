import { UserModel } from "@prisma/client";
import { CreateUserInput, CreateUserResponse, LoginUserInput } from "./users.schema"
import { Role } from "../../shared/types/role";

export interface IUserService {
    createUser(input: CreateUserInput): Promise<CreateUserResponse>;
    login(input: LoginUserInput): Promise<{ token: string, role: Role }>;
    getUserByEmail(email: string): Promise<UserModel | null>
    verifyPassword(plainPassword: string, hashPassword: string): Promise<boolean>;
    // getUserById
    // getUsers
    // refreshToken
}