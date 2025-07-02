import { UserModel } from '@prisma/client';
import { getHashPassword } from '../../shared/utilits/hashedPassword';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';
import { CreateUserInput, CreateUserResponse, LoginUserInput } from './user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../../shared/types/role';
import { ERRORS } from '../errors/error.helper';
import { FastifyInstance } from 'fastify';

export class UserService implements IUserService {
	private userRepository: IUserRepository;
	private app: FastifyInstance;

	constructor({ userRepository, app }: { userRepository: IUserRepository; app: FastifyInstance }) {
		this.userRepository = userRepository;
		this.app = app;
	}

	async createUser(input: CreateUserInput): Promise<CreateUserResponse> {
		const { password, ...rest } = input;

		const hashedPassword = await getHashPassword(password);

		const newUser = await this.userRepository.create({
			...rest,
			password: hashedPassword,
		});

		return {
			username: newUser.username,
			email: newUser.email,
		};
	}

	async login({ email, password }: LoginUserInput): Promise<{ token: string; role: Role }> {
		const findedUser = await this.getUserByEmail(email);
		if (!findedUser) {
			throw ERRORS.userNotExists;
		}

		const isCorrectPassword = await this.verifyPassword(password, findedUser.password);
		if (!isCorrectPassword) {
			throw ERRORS.wrongPassword;
		}

		const token = this.app.jwt.sign({ id: findedUser.id, email: findedUser.email });

		// нужно сделать проверку роли
		// if (ROLE.includes(role as Role)) {
		//     throw ERRORS.userCredError;k
		// }

		return { token, role: findedUser.role };
	}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		return this.userRepository.findByEmail(email);
	}

	async verifyPassword(plainPassword: string, hashPassword: string): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashPassword);
	}
}
