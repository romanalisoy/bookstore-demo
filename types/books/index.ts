export interface Book {
    id?: number;
    title: string;
    author: string,
    published_date: DateString
    isbn: string,
    number_of_pages: number,
    cover_image_url: string,
    language: string,
}

export type DateString = string | Date;