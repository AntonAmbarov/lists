export const serverOpts = {
    ajv: {
        customOptions: {
            removeAdditional: 'all' as const,
            allErrors: false,
            coerceTypes: 'array' as const,
        }
    },
    logger: {
        level: 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'HH:MM:ss Z',
            },
        },
    }
}