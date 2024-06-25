import {User} from "../src/entities/user";
import {Request as ExpressRequest} from "express";

export interface Request extends ExpressRequest {
    user ?: User
    service ?: any
}