import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    published_date: Date;

    @Column()
    isbn: string;

    @Column()
    number_of_pages: number;

    @Column()
    cover_image_url: string;

    @Column()
    language: string;
}