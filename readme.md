# Book Management API

## Description
A Book Management API built with Node.js, TypeScript, MySQL, and TypeORM. It supports JWT-based authentication, search functionality, and pagination.

## Features
- JWT-based authentication
- CRUD operations for books
- Search functionality (by title, author, or ISBN)
- Pagination
- Docker and Docker Compose for containerization

## Prerequisites
- Docker and Docker Compose installed on your machine
- Node.js and npm installed

## Installation

### Using Docker

1. **Clone the repository:**

    ```sh
    git clone https://github.com/romanalisoy/book-management-api.git
    cd book-management-api
    ```

2. **Create a `.env.production` file in the root directory with the following content:**

    ```env
    DB_HOST=mysql
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=123456
    DB_NAME=books_db
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```

3. **Build and run the containers:**

    ```sh
    docker-compose up --build
    ```

4. **Access the application:**

   The API will be accessible at `http://localhost:3000`.

### Using Local Development Environment

1. **Clone the repository:**

    ```sh
    git clone https://github.com/romanalisoy/book-management-api.git
    cd book-management-api
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory with the following content:**

    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=123456
    DB_NAME=books_db
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```

4. **Run MySQL locally:**

   Make sure you have MySQL running locally with the specified credentials. 
   
   If you do not have a local mysql server, you can create a mysql server or download a local mysql server with the following command:
   ```sh
   docker run -p 3306:3306 --name my-local-mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0
   ```
5. **Run migrations:**

    ```sh
    npm run typeorm migration:run
    ```

6. **Start the application:**

    ```sh
    npm run watch
    ```

7. **Access the application:**

   The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Authentication
- **Register**: POST /api/register
- **Login**: POST /api/login

### Books
- **Create a Book**: POST /api/books (Protected)
- **Get All Books**: GET /api/books?page=1&limit=10&search=term
- **Get a Single Book**: GET /api/books/:id
- **Update a Book**: PUT /api/books/:id (Protected)
- **Delete a Book**: DELETE /api/books/:id (Protected)

### Documentation
The "Postman" documentation can be found in the project's main directory. When importing via the Postman application, you must create a new enviorment and set the value of the BASEURL variable
## Environment Variables

- **DB_HOST**: Database host
- **DB_PORT**: Database port
- **DB_USERNAME**: Database username
- **DB_PASSWORD**: Database password
- **DB_NAME**: Database name
- **JWT_SECRET**: Secret key for JWT
- **PORT**: Port for the application

## Running Migrations

To run the migrations, use the following command:

```sh
npm run typeorm migration:run
