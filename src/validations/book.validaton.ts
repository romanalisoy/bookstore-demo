import {date, number, object, string} from 'yup';
import {Book} from "../../types/books";
import {httpUnprocessableEntity} from "../exceptions/http.exception";



export const validateBook: (data: Book) => Promise<Book> = async (data: Book) => {
    const bookSchema = object({
        title: string().required().min(3).max(255),
        author: string().required().min(3).max(60),
        published_date: string().required(),
        isbn: string().required(),
        number_of_pages: number().nullable(),
        cover_image_url: string().nullable().url().max(255),
        language: string().nullable().max(2),
    });

    try {
        return bookSchema.validateSync(data, {abortEarly: false, stripUnknown: true}) as Book;
    } catch (e) {
        throw new httpUnprocessableEntity(e.errors);
    }
};
