# Library Information System API

RESTful API for a Library Information System built with TypeScript, Node.js, Express.js, PostgreSQL and Prisma ORM.

---

# Autorid

Artjom Pšenitšnikov, Marek Veskimeister, Baddar Abobakr

# Technologies

Backend technologies used in the project:

* TypeScript
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Zod Validation
* Swagger / OpenAPI
* ts-node-dev

Additional tools:

* Prisma Migrations
* Prisma Seed
* Prisma Studio
* REST API architecture
* Pagination / Filtering / Sorting

---

# Project Overview

The system manages:

* Books
* Authors
* Publishers
* Reviews
* Genres

Main functionality implemented:

* Full CRUD for Books
* Reviews linked to Books with rating system
* Average rating calculation using Prisma aggregations
* Filtering by title, author, genre, language, year, publisher
* Sorting by title and published year
* Pagination with page and limit parameters
* PostgreSQL database with Prisma ORM
* Validation with Zod
* Centralized error handling with proper HTTP status codes
* Swagger API documentation

---

# Features

## Books

Supported operations:

* Create a book
* Get all books with filtering, sorting and pagination
* Get book by ID
* Update book
* Delete book

Additional functionality:

* Filter books by title, author, genre, language, year, publisher
* Sort books by title or published year (asc/desc)
* Pagination (page, limit)
* Get all reviews for a book
* Calculate average rating for a book

---

## Authors

Supported operations:

* Get all authors
* Get author by ID
* Get all books by author

---

## Publishers

Supported operations:

* Get all publishers
* Get publisher by ID
* Get all books by publisher

---

## Reviews

Supported operations:

* Create review for a book (via Books endpoint)
* Get all reviews for a book (via Books endpoint)
* Get review by ID
* Update review
* Delete review

---

## Genres

Supported operations:

* Get all genres
* Get all books by genre

---

# Database Structure

The project uses PostgreSQL together with Prisma ORM.

## Relationships

### Author → Books

One Author can have many Books. (1:N)

### Publisher → Books

One Publisher can publish many Books. (1:N)

### Book → Reviews

One Book can have many Reviews. (1:N)

### Book ↔ Genres

Many-to-many relationship between Books and Genres. (N:M)

---

# Prisma Models

## Author

| Field       | Type     | Description          |
| ----------- | -------- | -------------------- |
| id          | String   | UUID                 |
| firstName   | String   |                      |
| lastName    | String   |                      |
| birthYear   | Int      |                      |
| nationality | String   |                      |
| biography   | String?  | Optional             |
| createdAt   | DateTime |                      |
| updatedAt   | DateTime |                      |

---

## Publisher

| Field       | Type     | Description          |
| ----------- | -------- | -------------------- |
| id          | String   | UUID                 |
| name        | String   | Unique               |
| country     | String   |                      |
| foundedYear | Int      |                      |
| website     | String?  | Optional             |
| createdAt   | DateTime |                      |
| updatedAt   | DateTime |                      |

---

## Book

| Field         | Type     | Description          |
| ------------- | -------- | -------------------- |
| id            | String   | UUID                 |
| title         | String   |                      |
| isbn          | String   | Unique               |
| publishedYear | Int      |                      |
| pageCount     | Int      |                      |
| language      | String   |                      |
| description   | String   |                      |
| coverImage    | String?  | Optional             |
| authorId      | String   | Foreign key          |
| publisherId   | String   | Foreign key          |
| createdAt     | DateTime |                      |
| updatedAt     | DateTime |                      |

Indexes: title, authorId, publisherId, publishedYear, language

---

## Review

| Field     | Type     | Description          |
| --------- | -------- | -------------------- |
| id        | String   | UUID                 |
| bookId    | String   | Foreign key          |
| userName  | String   |                      |
| rating    | Int      | 1 to 5               |
| comment   | String   |                      |
| createdAt | DateTime |                      |

Indexes: bookId, rating

---

## Genre

| Field | Type   | Description          |
| ----- | ------ | -------------------- |
| id    | String | UUID                 |
| name  | String | Unique               |

---

# Project Structure

backend/  
│  
├── prisma/  
│   ├── schema.prisma  
│   ├── migrations/  
│   └── seed.ts  
│  
├── src/  
│   ├── controllers/  
│   │   ├── book.controller.ts  
│   │   ├── review.controller.ts  
│   │   ├── author.controller.ts  
│   │   ├── genre.controller.ts  
│   │   └── publisher.controller.ts  
│   ├── routes/  
│   │   ├── book.routes.ts  
│   │   ├── review.routes.ts  
│   │   └── index.ts  
│   ├── services/  
│   │   ├── book.service.ts  
│   │   └── review.service.ts  
│   ├── validators/  
│   │   ├── book.validator.ts  
│   │   └── review.validator.ts  
│   ├── middleware/  
│   │   ├── errorHandler.ts  
│   │   └── validate.ts  
│   ├── models/  
│   │   ├── Book.ts  
│   │   ├── Author.ts  
│   │   ├── Publisher.ts  
│   │   ├── Review.ts  
│   │   └── Genre.ts  
│   ├── lib/  
│   │   └── prisma.ts  
│   ├── swagger.ts  
│   └── index.ts  
│  
├── package.json  
├── tsconfig.json  
├── docker-compose.yml  
├── .env.example  
├── .gitignore  
└── README.md  

# Installation

## 1. Clone repository
git clone "repository-url"

## 2. Install dependencies
npm install

# Environment Variables

Create .env file in the backend folder.

Example:

DATABASE_URL="postgresql://postgres:password@localhost:5432/library_db"
PORT=3000


# Prisma Setup
## Generate Prisma Client

npx prisma generate

## Run migrations

npx prisma migrate dev

## Seed database

npx prisma db seed

## Open Prisma Studio

npx prisma studio

##Running the Server

Development mode:

npm run dev

Server runs on:

http://localhost:3000

# API Endpoints
## Books
### Create Book
POST /api/v1/books

Request body:

{
  "title": "Harry Potter",
  "isbn": "9780439708180",
  "publishedYear": 1997,
  "pageCount": 320,
  "language": "English",
  "description": "Fantasy novel",
  "authorId": 1,
  "publisherId": 1
}

### Get All Books
GET /api/v1/books

### Get Book By ID
GET /api/v1/books/:id

### Update Book
PUT /api/v1/books/:id

### Delete Book
DELETE /api/v1/books/:id

### Get Book Reviews
GET /api/v1/books/:id/reviews

### Get Average Rating
GET /api/v1/books/:id/average-rating

Response example:

{
  "bookId": 1,
  "averageRating": 4.6
}

## Query Parameters
### Filtering

Examples:

GET /api/v1/books?title=harry
GET /api/v1/books?language=English
GET /api/v1/books?year=2007
GET /api/v1/books?genre=Fantasy
GET /api/v1/books?publisher=bloomsbury

### Sorting

Examples:

GET /api/v1/books?sortBy=title&order=asc
GET /api/v1/books?sortBy=publishedYear&order=desc

### Pagination

Example:

GET /api/v1/books?page=1&limit=10

Pagination response format:

{
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}

## Authors API
### Endpoints

POST   /api/v1/authors
GET    /api/v1/authors
GET    /api/v1/authors/:id
PUT    /api/v1/authors/:id
DELETE /api/v1/authors/:id
GET    /api/v1/authors/:id/books

## Publishers API
### Endpoints

POST   /api/v1/publishers
GET    /api/v1/publishers
GET    /api/v1/publishers/:id
PUT    /api/v1/publishers/:id
DELETE /api/v1/publishers/:id
GET    /api/v1/publishers/:id/books

## Reviews API
### Endpoints

POST   /api/v1/books/:bookId/reviews
GET    /api/v1/books/:bookId/reviews
GET    /api/v1/reviews/:id
PUT    /api/v1/reviews/:id
DELETE /api/v1/reviews/:id

## Genres API
### Endpoints

GET    /api/v1/genres
POST   /api/v1/genres
GET    /api/v1/genres/:id
GET    /api/v1/genres/:id/books

## Validation

The project uses Zod for runtime validation.

Validation includes:

Required fields
Data types
ISBN validation
Rating range validation (1–5)
Request body validation

## Error Handling

Centralized error handling middleware is implemented.

Example error response:

{
  "error": "Validation failed",
  "details": [
    {
      "field": "isbn",
      "message": "Invalid ISBN format"
    }
  ]
}

Supported HTTP status codes:

200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error

## Prisma Features Used

Relations
Include queries
Aggregations
Migrations
Seed scripts
Transactions
Cascade delete
Indexed fields

## Example cURL Requests
### Create Book

curl -X POST http://localhost:3000/api/v1/books \
-H "Content-Type: application/json" \
-d '{
  "title":"Harry Potter",
  "isbn":"9780439708180",
  "publishedYear":1997,
  "pageCount":320,
  "language":"English",
  "description":"Fantasy novel",
  "authorId":1,
  "publisherId":1
}'

### Get All Books
curl http://localhost:3000/api/v1/books

### Get Books with Pagination
curl "http://localhost:3000/api/v1/books?page=1&limit=5"

### Get Sorted Books
curl "http://localhost:3000/api/v1/books?sortBy=publishedYear&order=desc"
