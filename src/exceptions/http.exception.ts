export class httpError extends Error {
    code = 400;
    constructor(message: string = 'An error occurred') {
        super(message);
    }
}

class NotFoundError extends httpError {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.code = 404;
    }
}

export class httpForbidden extends httpError {
    constructor(message: string, stack = null) {
        super();
        this.code = 403;
        this.message = message
        this.stack = stack;
    }
}

export class httpUnAuthorized extends httpError {
    constructor(message: string, stack = null) {
        super();
        this.code = 401;
        this.message = message
        this.stack = stack;
    }
}

export class httpUnprocessableEntity extends httpError {
    constructor(message: any, stack = null) {
        super();
        this.code = 422;
        this.message = message
        this.stack = stack;
        this.name = 'UnprocessableError';
    }

}

export class httpBadRequest extends httpError {
    constructor(message: string, stack = null) {
        super();
        this.code = 400;
        this.message = message
        this.stack = stack;
    }
}