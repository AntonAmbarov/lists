import { createContainer, asClass, asFunction, AwilixContainer } from 'awilix';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';
import { UserService } from './user.service';
import { UserModel } from '@prisma/client';
import { CreateUserInput } from './user.schema';
import bcrypt from 'bcrypt';
import { getHashPassword } from '../../shared/utilits/hashedPassword';
import jwt from 'jsonwebtoken';
import { AppError, ERRORS } from '../errors/error.helper';

jest.mock('bcrypt');
jest.mock('../../shared/utilits/hashedPassword');
jest.mock('jsonwebtoken');

let diContainer: AwilixContainer;
let userService: IUserService;
let mockUserRepository: jest.Mocked<IUserRepository>;

const mockInput: CreateUserInput = {
	username: 'Anton',
	email: 'anton@example.ru',
	password: 'password',
};

const mockUser: UserModel = {
	id: 1,
	username: 'Anton',
	email: 'anton@example.ru',
	password: 'hashed-password',
	createdAt: new Date('1990-01-01'),
	updatedAt: new Date('1990-01-01'),
	role: 'USER',
};

const mockHashedPassword = 'hashed-password';

const mockToken = 'jwttoken';

const mockPrivateKey = 'privateKey';

describe('UserService', () => {
	beforeEach(() => {
		diContainer = createContainer();

		mockUserRepository = {
			create: jest.fn(),
			findByEmail: jest.fn(),
		} as jest.Mocked<IUserRepository>;

		diContainer.register({
			userService: asClass(UserService).scoped(),
			userRepository: asFunction(() => mockUserRepository).scoped(),
		});

		userService = diContainer.resolve('userService');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('Должен корректно создаваться новый пользователь', async () => {
			(getHashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);
			mockUserRepository.create.mockResolvedValue(mockUser);

			const result = await userService.createUser(mockInput);

			expect(result).toEqual({
				username: mockInput.username,
				email: mockInput.email,
			});

			expect(mockUserRepository.create).toHaveBeenCalledWith({
				username: mockInput.username,
				email: mockInput.email,
				password: mockHashedPassword,
			});
		});
	});

	describe('login', () => {
		it('Авторизация должна проходить корректно. На выходе получаем токен и роль пользователя', async () => {
			(jwt.sign as jest.Mock).mockReturnValue(mockToken);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			mockUserRepository.findByEmail.mockResolvedValue(mockUser);

			const result = await userService.login({
				email: mockInput.email,
				password: mockInput.password,
			});

			expect(result).toEqual({
				token: mockToken,
				role: mockUser.role,
			});

			expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockInput.email);
			expect(bcrypt.compare).toHaveBeenCalledWith(mockInput.password, mockHashedPassword);
			expect(jwt.sign).toHaveBeenCalledWith({ email: mockInput.email }, mockPrivateKey, {
				expiresIn: '10h',
			});
		});

		it('по email`у должен возвращаться объект с данными пользователя', async () => {
			mockUserRepository.findByEmail.mockResolvedValue(mockUser);

			const result = await userService.getUserByEmail(mockInput.email);

			expect(result).toEqual({
				username: mockUser.username,
				email: mockUser.email,
				password: mockUser.password,
				id: mockUser.id,
				createdAt: mockUser.createdAt,
				updatedAt: mockUser.updatedAt,
				role: mockUser.role,
			});
			expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockInput.email);
		});

		it('при неверном email`е должна быть ошибка USER_NOT_EXISTS', async () => {
			(jwt.sign as jest.Mock).mockReturnValue(mockToken);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);

			mockUserRepository.findByEmail.mockResolvedValue(null);

			await expect(
				userService.login({
					email: mockInput.email,
					password: mockInput.password,
				}),
			).rejects.toBeInstanceOf(AppError);

			await expect(
				userService.login({
					email: mockInput.email,
					password: mockInput.password,
				}),
			).rejects.toMatchObject({
				statusCode: 404,
				code: 'USER_NOT_EXISTS',
				message: 'Пользователь не существует',
			});
		});

		it('При неверном пароле должна быть ошибка WRONG_PASSWORD', async () => {
			(jwt.sign as jest.Mock).mockReturnValue(mockToken);
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			mockUserRepository.findByEmail.mockResolvedValue(mockUser);

			await expect(
				userService.login({
					email: mockInput.email,
					password: mockInput.password,
				}),
			).rejects.toBeInstanceOf(AppError);

			await expect(
				userService.login({
					email: mockInput.email,
					password: mockInput.password,
				}),
			).rejects.toMatchObject({
				statusCode: 401,
				code: 'WRONG_PASSWORD',
				message: 'Пароль неверный',
			});
		});
	});
});
