import {NextFunction, Response} from "express";
import {Request} from "../../types";
import jwt from "jsonwebtoken";
import {User} from "../entities/user";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as User
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
