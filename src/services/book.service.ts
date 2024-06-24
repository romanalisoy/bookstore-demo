import { Book } from '../entities/book';

export class BookService {

    async create(bookData: Partial<Book>): Promise<Book> {
        let book = new Book();

        book.title = bookData.title;
        book.author = bookData.author;
        book.published_date = bookData.published_date;
        book.isbn = bookData.isbn;
        book.number_of_pages = bookData.number_of_pages;
        book.cover_image_url = bookData.cover_image_url;
        book.language = bookData.language;

        const a = await book.save();
    }

    async getAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async getById(id: number): Promise<Book | null> {
        return this.bookRepository.findOne(id);
    }

    async update(id: number, bookData: Partial<Book>): Promise<Book> {
        await this.bookRepository.update(id, bookData);
        return this.getById(id);
    }

    async delete(id: number): Promise<void> {
        await this.bookRepository.delete(id);
    }
}
