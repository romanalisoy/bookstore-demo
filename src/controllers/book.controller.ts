import {Request, Response} from 'express';
import BookService from '../services/book.service';
import {validateBook} from "../validations/book.validaton";

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

    public async create(req: Request, res: Response) {
        const newBook = await bookService.create(await validateBook(req.body));
        res.status(201).json(newBook);
    }

    public async getAll(req: Request, res: Response) {
        const books = await bookService.getAll();
        res.json(books);
    }

    public async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const book = await bookService.getById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({message: 'Book not found'});
        }
    }

    public async update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const updatedBook = await bookService.update(id, await validateBook(req.body));
        res.json(updatedBook);
    }

    public async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await bookService.delete(id);
        res.status(204).send();
    }
}
