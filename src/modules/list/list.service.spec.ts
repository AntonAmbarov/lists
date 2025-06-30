import { asClass, asFunction, AwilixContainer, createContainer } from 'awilix';
import { ListService } from './list.service';
import { ListRepository } from './list.repository';
import { IListRepository } from './list.repository.interface';
import { IListService } from './list.service.interface';
import { Status } from '../../shared/types/status';
import { AppError } from '../errors/error.helper';

let diContainer: AwilixContainer;
let mockListRepository: jest.Mocked<IListRepository>;
let listService: IListService;

const mockListInput = {
	title: 'Новый список',
	status: 'MODERATION' as Status,
	authorId: 1,
	img: 'img.jpg',
	description: 'Большое описание нового списка',
};

const mockListModel = {
	id: 1,
	title: 'Новый список',
	status: 'MODERATION' as Status,
	authorId: 1,
	img: 'img.jpg',
	description: 'Большое описание нового списка',
	createdAt: new Date('1990-01-01'),
	updatedAt: new Date('1990-01-01'),
};

const mockCardsForList = [
	{
		id: 1,
		createdAt: new Date('1990-01-01'),
		updatedAt: new Date('1990-01-01'),
		listId: 1,
		cardId: 1,
		card: {
			id: 1,
			createdAt: new Date('1990-01-01'),
			updatedAt: new Date('1990-01-01'),
			title: 'Ergonomic Metal Shirt',
			img: '/rescue/unlike.lrf',
			description: 'Ipsam capillus communis.',
			authorId: 1,
			status: 'ACTIVE',
			externalId: 'b69afdb6-c0b0-4aab-b75d-5fb2c9ea5cc2',
		},
	},
	{
		id: 2,
		createdAt: new Date('1990-01-01'),
		updatedAt: new Date('1990-01-01'),
		listId: 1,
		cardId: 2,
		card: {
			id: 2,
			createdAt: new Date('1990-01-01'),
			updatedAt: new Date('1990-01-01'),
			title: 'Small Frozen Sausages',
			img: '/rescue/through.tiff',
			description: 'Adulescens beatus aegrus adimpleo turpis dedico tener ambitus fuga.',
			authorId: 1,
			status: 'ACTIVE',
			externalId: 'f86b0bb9-a9c4-4288-8103-8a7d8ce76190',
		},
	},
	{
		id: 3,
		createdAt: new Date('1990-01-01'),
		updatedAt: new Date('1990-01-01'),
		listId: 1,
		cardId: 4,
		card: {
			id: 4,
			createdAt: new Date('1990-01-01'),
			updatedAt: new Date('1990-01-01'),
			title: 'Handcrafted Steel Salad',
			img: '/var/mail/official_lawmaker_genuine.conf',
			description: 'Veritatis comis arguo architecto suscipio tego sumo stips crux aestivus.',
			authorId: 1,
			status: 'ACTIVE',
			externalId: '2cd46218-8d13-451f-860f-6d35953b1dd6',
		},
	},
];

describe('list.service', () => {
	beforeEach(() => {
		mockListRepository = {
			create: jest.fn(),
			findOne: jest.fn(),
			findCardsByList: jest.fn(),
			createListCardRelation: jest.fn(),
		} as jest.Mocked<IListRepository>;

		diContainer = createContainer();

		diContainer.register({
			listService: asClass(ListService).scoped(),
			listRepository: asFunction(() => mockListRepository).scoped(),
		});

		listService = diContainer.resolve('listService');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('addList', () => {
		it('должна добавляться новая карточка', async () => {
			mockListRepository.create.mockResolvedValue(mockListModel);

			const result = await listService.addList(mockListInput);

			expect(result).toEqual(mockListModel);
			expect(mockListRepository.create).toHaveBeenCalledWith(mockListInput);
		});
	});

	describe('getList', () => {
		it('должен возвращаться элемент list по корректному id', async () => {
			mockListRepository.findOne.mockResolvedValue(mockListModel);

			const result = await listService.getList(1);

			expect(result).toEqual(mockListModel);
			expect(mockListRepository.findOne).toHaveBeenCalledWith(1);
		});

		it('если элемент list не найден по id, должна выбрасываться ошибка LIST_NOT_EXISTS', async () => {
			mockListRepository.findOne.mockResolvedValue(null);

			await expect(listService.getList(1)).rejects.toMatchObject({
				statusCode: 400,
				code: 'LIST_NOT_EXISTS',
				message: 'Списка не существует',
			});

			await expect(listService.getList(1)).rejects.toBeInstanceOf(AppError);
		});
	});

	describe('getCardsByList', () => {
		it('по id списка должны возвращаться привязанные к нему карточки', async () => {
			mockListRepository.findCardsByList.mockResolvedValue(mockCardsForList);

			const result = await listService.getCardsByList(1);

			expect(result).toEqual(mockCardsForList);
			expect(mockListRepository.findCardsByList).toHaveBeenCalledWith(1);
		});
	});

	describe('addCardToList', () => {
		it('к указанному списку должна привязываться карточка по id', async () => {
			mockListRepository.createListCardRelation.mockResolvedValue({
				id: mockCardsForList[0].id,
				createdAt: mockCardsForList[0].createdAt,
				updatedAt: mockCardsForList[0].updatedAt,
				listId: mockCardsForList[0].listId,
				cardId: mockCardsForList[0].cardId,
			});

			const result = await listService.addCardToList(1, 1);

			expect(result).toEqual({
				id: mockCardsForList[0].id,
				createdAt: mockCardsForList[0].createdAt,
				updatedAt: mockCardsForList[0].updatedAt,
				listId: mockCardsForList[0].listId,
				cardId: mockCardsForList[0].cardId,
			});
			expect(mockListRepository.createListCardRelation).toHaveBeenCalledWith(1, 1);
		});
	});
});
