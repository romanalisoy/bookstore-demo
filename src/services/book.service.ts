import {Book} from '../entities/book';
import AppDataSource from "../configs/datasource.config";
import {DataSource} from "typeorm";
import {response} from "express";

export default class BookService {

    private dataSource: DataSource = AppDataSource;

    async create(bookData: Partial<Book>): Promise<Book> {
        const book = this.dataSource.manager.create(Book, bookData);
        await this.dataSource.manager.save(Book, book);
        return book;
    }

    async getAll(
        page: number = 1,
        limit: number = 10,
        search: string = ""
    ): Promise<{
        data: Book[];
        count: number;
    }> {
        const offset = (page - 1) * limit;
        const query = this.dataSource.manager
            .createQueryBuilder(Book, "book")
            .where("book.title LIKE :search OR book.author LIKE :search OR book.isbn LIKE :search", {
                search: `%${search}%`,
            })
            .skip(offset)
            .take(limit);

        const [data, count] = await query.getManyAndCount();

        return {data, count};
    }

    async getById(id: number): Promise<Book | null> {
        return await this.dataSource.manager.findOneBy(Book, {id});
    }

    async update(id: number, bookData: Partial<Book>): Promise<Book | null> {
        const book = await this.dataSource.manager.findOneBy(Book, {id});
        if (!book) {
            return null;
        }
        this.dataSource.manager.merge(Book, book, bookData);
        await this.dataSource.manager.save(Book, book);
        return book;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.dataSource.manager.delete(Book, {id});
        return result.affected !== 0;
    }
}
