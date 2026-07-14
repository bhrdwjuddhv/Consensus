/**
 * Standard success envelope: { success, statusCode, message, data }.
 * `success` is declared first so it leads the serialised JSON.
 */
class ApiResponse {
    constructor(statusCode, data = {}, message = "Success") {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };
