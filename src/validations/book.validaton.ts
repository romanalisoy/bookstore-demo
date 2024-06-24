import vine, { errors } from '@vinejs/vine';
import {Book} from "../../types/books";

export const validateBook = async (data: Book) => {
    const bookSchema = vine.object({
        title: vine.string(),
        author: vine.string(),
        published_date: vine.date().optional(),
        isbn: vine.string().optional(),
        number_of_pages: vine.number().optional(),
        cover_image_url: vine.string().url().optional(),
        language: vine.string().optional(),
    });
    try {
        const validatedData: Book = await vine.validate({
            data: data,
            schema: bookSchema
        });
        return validatedData;
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
        }
    }




};
