import { ValidationError } from "joi";

export class CustomException extends Error {
    public statusCode: number;
    public validationErrors?: ValidationError;
    public requestId: string;

    constructor(
        statusCode: number,
        message?: string,
        validationErrors?: ValidationError
    ) {
        super(message);
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
        this.requestId = global.traceIdForRequest;
    }
}

export class UnauthorizedException extends CustomException {
    constructor(message?: string) {
        super(401, message);
    }
}

export class BadRequestException extends CustomException {
    constructor(validationErrors: ValidationError) {
        super(400, undefined, validationErrors);
    }
}

export class BadRequestExceptionMessage extends CustomException {
    constructor(message?: string) {
        super(400, message);
    }
}