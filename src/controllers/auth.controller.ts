import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService: UserService = new UserService();

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await userService.register(username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);
        if (!token) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
