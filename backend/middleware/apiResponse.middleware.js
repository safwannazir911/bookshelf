export class ApiResponse {
    static success(message = "Success", statusCode = 200, data = {}) {
        return {
            statusCode,
            message,
            ...data
        };
    }

    static error(message = "Something went wrong", statusCode = 500) {
        return {
            statusCode,
            message,
        };
    }


}