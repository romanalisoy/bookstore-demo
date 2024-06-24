import { errors } from "@vinejs/vine"

export class httpError extends Error {
    code = 500;
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

export class httpNotFound extends httpError {
    constructor(message: string, stack = null) {
        super();
        this.code = 404;
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