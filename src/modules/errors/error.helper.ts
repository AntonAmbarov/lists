import { Prisma } from "@prisma/client";
import { FastifyError } from "fastify";

interface AppErrorProps {
    message: string;
    statusCode: number;
    code: string;
    details?: Record<string, any> | Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
    error: {
        message: string,
        code: string,
        details?: Record<string, any> | Array<{ field: string; message: string }>
    }
}

interface PrismaErrorDetails {
    target?: string | string[];
    field_name?: string;
    cause?: string;
    column_name?: string;
    constraint?: string;
    relation_name?: string;
    model_name?: string;
    [key: string]: any;
}

class AppError extends Error implements AppErrorProps {
    constructor(
        readonly message: string,
        readonly statusCode: number,
        readonly code: string,
        readonly details?: Record<string, any> | Array<{ field: string; message: string }>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

function prismaErrorHandler(error: Prisma.PrismaClientKnownRequestError): AppError {
    const meta = error.meta as PrismaErrorDetails || {};

    switch (error.code) {
        case 'P2002':
            return new AppError(
                'Запись уже существует',
                409,
                'UNIQUE_CONSTRAINT',
                { field: meta.target || 'unknown' }
            )
        case 'P2003':
            return new AppError(
                'Сбой ограничения внешнего ключа',
                400,
                'FOREIGN_KEY_CONSTRAINT',
                { field: meta.field_name || 'unknown' },
            );
        case 'P2025':
            return new AppError(
                'Запись не найдена',
                404,
                'NOT_FOUND',
                meta.cause ? { cause: meta.cause } : {},
            );
        case 'P2000':
            return new AppError(
                'Значение слишком длинное для колонки',
                400,
                'VALUE_TOO_LONG',
                { field: meta.column_name || 'unknown' },
            );
        case 'P2011':
            return new AppError(
                'Обязательное поле не может быть null',
                400,
                'NULL_CONSTRAINT',
                { constraint: meta.constraint || 'unknown' },
            );
        case 'P2001':
            return new AppError(
                'Запись не существует',
                404,
                'NOT_FOUND',
                meta.cause ? { cause: meta.cause } : {},
            );
        case 'P2004':
            return new AppError(
                'Нарушение ограничений базы данных',
                400,
                'CONSTRAINT_VIOLATION',
                { constraint: meta.constraint || 'unknown' },
            );
        case 'P2014':
            return new AppError(
                'Невозможно изменить запись из-за наличия связанных записей',
                409,
                'RELATION_VIOLATION',
                {
                    relation: meta.relation_name || 'unknown',
                    model: meta.model_name || 'unknown'
                },

            );
        default:
            return new AppError(
                'Ошибка базы данных',
                500,
                'DATABASE_ERROR',
                meta,
            );
    }
}

function validationErrorHandler(error: FastifyError): AppError {
    if (!error.validation) {
        return new AppError(
            'Ошибка валидации данных',
            400,
            'VALIDATION_ERROR',
        );
    }

    const details = error.validation.map(err => ({
        field: err.instancePath?.replace('/', '') || err.params?.missingProperty || 'unknown',
        message: err.message || 'Недопустимое значение'
    }))

    return new AppError(
        'Ошибка валидации данных',
        400,
        'VALIDATION_ERROR',
        { details: details }
    );
}

function defaultHandler(error: unknown): AppError {
    const message = error instanceof Error ? error.message || 'Фатальная ошибка' : 'Фатальная ошибка';

    return new AppError(
        message,
        500,
        'UNKNOWN_ERROR'
    );
}

export function errorHandler(error: unknown) {
    if (typeof error === 'object' && error !== null && 'validation' in error) {
        return validationErrorHandler(error as FastifyError);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return prismaErrorHandler(error);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return new AppError(
            'Недопустимые данные запроса',
            400,
            'VALIDATION_ERROR'
        );
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return new AppError(
            'Ошибка инициализации базы данных',
            500,
            'DATABASE_INIT_ERROR',
            {
                code: error.errorCode,
            }
        );
    }

    if (error instanceof AppError) {
        return error;
    }

    return defaultHandler(error);
}

export const ERRORS = {
    invalidToken: new AppError('Невалидный токен', 401, 'INVALID_TOKEN'),
    userExists: new AppError('Пользователь уже существует', 409, 'USER_EXISTS'),
    userNotExists: new AppError('Пользователь не существует', 404, 'USER_NOT_EXISTS'),
    userCredError: new AppError('Недействительная учетная запись', 401, 'INVALID_CREDENTIAL'),
    tokenError: new AppError('Ошибка токена', 401, 'TOKEN_ERROR'),
    invalidRequest: new AppError('Недопустимые данные запроса', 400, 'INVALID_REQUEST'),
    internalServerError: new AppError('Ошибка сервера', 500, 'INTERNAL_SERVER_ERROR'),
    unauthorizedAccess: new AppError('Доступ запрещен', 401, 'UNAUTHORIZED_ACCESS'),
    wrongPassword: new AppError('Пароль неверный', 401, 'WRONG_PASSWORD')
}