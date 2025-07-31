export class ApiResponse<T = any> {
    statusCode: number;
    message: string;
    data?: T;
    success?: boolean;

    constructor(
        statusCode: number = 200,
        data?: T,
        message: string = "Success",
        success: boolean = true
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
    }
}