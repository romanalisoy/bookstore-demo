import AppDataSource from "../configs/datasource.config";
import {User} from "../entities/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {DataSource} from "typeorm";

export class UserService {
    private dataSource: DataSource = AppDataSource;

    async register(username: string, password: string): Promise<User> {
        const user = this.dataSource.manager.create(User, { username, password: await bcrypt.hash(password, 10) });
        await this.dataSource.manager.save(User, user);
        return user;
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = await this.dataSource.manager.findOneBy(User, { username });
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return token;
    }
}
