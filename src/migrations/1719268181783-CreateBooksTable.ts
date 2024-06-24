import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm";

export class CreateBooksTable1719268181783 implements MigrationInterface {
    table: string = "books";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.table,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "author",
                        type: "varchar",
                        length: "60",
                    },
                    {
                        name: "published_date",
                        type: "date",
                    },
                    {
                        name: "isbn",
                        type: "varchar",
                    },
                    {
                        name: "number_of_pages",
                        type: "int",
                    },
                    {
                        name: "cover_image_url",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "language",
                        type: "varchar",
                        length: "2",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table)
    }

}
