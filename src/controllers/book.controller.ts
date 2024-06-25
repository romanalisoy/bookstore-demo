import {NextFunction, response, Response} from 'express';
import {Request} from '../../types';
import BookService from '../services/book.service';
import {validateBook} from "../validations/book.validaton";
import {Book} from "../../types/books";
import {httpError, httpUnprocessableEntity} from "../exceptions/http.exception";

export default class BookController {

    private static _instance: BookController;
    private service: BookService;

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

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            req.service = new BookService();
            const newBook: Book = await req.service.create(await validateBook(req.body));
            res.status(201).json(newBook);
        } catch (error) {
            if (error instanceof httpUnprocessableEntity) {
                return res.status(error.code).json({ error: error.message });
            }
            next(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        req.service = new BookService();
        const { page = "1", limit = "10", search = "" } = req.query;
        const { data, count } = await req.service.getAll(
            Number(page),
            Number(limit),
            search.toString()
        );
        res.status(200).json({ data: data as Book[], count, page: Number(page), limit: Number(limit) });
    }

    public async getById(req: Request, res: Response) {
        req.service = new BookService();
        const id = parseInt(req.params.id);
        const book = await req.service.getById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({message: 'Book not found'});
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            // Encapsulate the service in the request object.
            req.service = new BookService();
            const id: number = parseInt(req.params.id);
            const updatedBook = await req.service.update(id, await validateBook(req.body));
            if(updatedBook === null){
                return res.status(404).json({
                    message: "Book not found",
                })
            }
            res.json(updatedBook);
        } catch (error) {
            if (error instanceof httpUnprocessableEntity) {
                return res.status(error.code).json({ error: error.message });
            }
            next(error);
        }
    }

    public async delete(req: Request, res: Response) {
        req.service = new BookService();
        const id = parseInt(req.params.id);
        await req.service.delete(id);
        res.status(204).send();
    }
}
