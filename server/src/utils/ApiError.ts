export class ApiError extends Error {
    statusCode: number;
    errors?: any;
    stackTrack?: string;

    constructor(
        statusCode: number = 500,
        message: string,
        errors?: any,
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stackTrack = stack || new Error().stack;
    }
}