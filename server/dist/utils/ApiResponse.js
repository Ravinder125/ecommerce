export class ApiResponse {
    constructor(statusCode = 200, data, message = "Success", success = true) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
    }
}
