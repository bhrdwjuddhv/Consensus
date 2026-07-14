/**
 * An error that is safe to show a client: it carries an intended HTTP status and
 * a message written for the caller. Anything thrown that is NOT an ApiError is
 * treated by the error handler as an unexpected fault and reported as a generic
 * 500, so internals never leak.
 */
class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = {}, options = {}) {
        super(message, options);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }

    /** Wire format. Note: no `stack`, ever. */
    toJSON() {
        return {
            success: false,
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
        };
    }
}

export { ApiError };
