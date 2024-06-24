import mysql, {RowDataPacket} from 'mysql2/promise';

export const checkOrCreateDatabase = async () => {
    const databaseName: string = process.env.DB_NAME || "book_store";

    const connection: mysql.Connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
    });

    try {
        const [databases] = await connection.query(`SHOW DATABASES LIKE '${databaseName}'`);
        // @ts-ignore
        if (databases.length === 0) {
            await connection.query(`CREATE DATABASE \`${databaseName}\``);
            console.log(`Database ${databaseName} created.`);
        } else {
            console.log(`Database ${databaseName} already exists.`);
        }
    } catch (e) {
        console.log(`Error checking or creating database: ${e.message}`);
    } finally {
        await connection.end();
    }
};