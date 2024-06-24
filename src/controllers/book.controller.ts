import { Request, Response } from 'express';
import BookService from '../services/book.service';
import vine from '@vinejs/vine';
import { Book } from '../entities/book';
import {bookSchema} from "../validations/book.validaton";

const bookService = new BookService();

export default class BookController {

    private static _instance: BookController;
    private service: BookService;

    constructor() {
        this.service = new BookService();
    }
    /**
     * Make the object singleton.
     * As a result, the object will be created only once and memory will be saved.
     *
     * Returns the instance of the BookController.
     *
     * @returns {BookController} The instance of the BookController.
     */
    public static get instance(): BookController {

        if (!this._instance) {
            this._instance = new BookController();
        }
        return this._instance;
    }

    async create(req: Request, res: Response) {
        const { error, value: bookData } = await vine.validate({
            data: req.body,
            schema: bookSchema
        });
        if (error) {
            return res.status(400).json({ errors: error });
        }
        const newBook = await bookService.create(bookData);
        res.status(201).json(newBook);
    }

    async getAll(req: Request, res: Response) {
        const books = await bookService.getAll();
        res.json(books);
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const book = await bookService.getById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { error, value: bookData } = await vine.validate({
            data: req.body,
            schema: bookSchema
        });
        if (error) {
            return res.status(400).json({ errors: error });
        }
        const updatedBook = await bookService.update(id, bookData);
        res.json(updatedBook);
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await bookService.delete(id);
        res.status(204).send();
    }
}
