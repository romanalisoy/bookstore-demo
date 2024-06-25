import { Request, Response, NextFunction } from 'express';
import {httpError} from "../exceptions/http.exception";
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof httpError) {
        return res.status(err.code).json({ error: err.message });
    }
    return res.status(500).json({ message: err.message });
}