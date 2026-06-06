import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'RESTful API for Library Management System',
      contact: {
        name: 'Artjom',
        email: 'your-email@example.com',
      },
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
            title: { type: 'string', example: 'Harry Potter and the Philosopher\'s Stone' },
            isbn: { type: 'string', example: '9780747532699' },
            publishedYear: { type: 'number', example: 1997 },
            pageCount: { type: 'number', example: 223 },
            language: { type: 'string', example: 'English' },
            description: { type: 'string', example: 'First book in the Harry Potter series' },
            coverImage: { type: 'string', nullable: true, example: 'https://example.com/cover.jpg' },
            authorId: { type: 'string', format: 'uuid' },
            publisherId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        BookWithDetails: {
          type: 'object',
          allOf: [
            { $ref: '#/components/schemas/Book' },
            {
              properties: {
                author: { $ref: '#/components/schemas/Author' },
                publisher: { $ref: '#/components/schemas/Publisher' },
                genres: { type: 'array', items: { $ref: '#/components/schemas/Genre' } },
              },
            },
          ],
        },
        CreateBookInput: {
          type: 'object',
          required: ['title', 'isbn', 'publishedYear', 'pageCount', 'language', 'description', 'authorId', 'publisherId', 'genreIds'],
          properties: {
            title: { type: 'string', example: 'The Midnight Library' },
            isbn: { type: 'string', example: '9780525559474' },
            publishedYear: { type: 'number', example: 2020 },
            pageCount: { type: 'number', example: 304 },
            language: { type: 'string', example: 'English' },
            description: { type: 'string', example: 'Between life and death there is a library.' },
            coverImage: { type: 'string', example: 'https://example.com/cover.jpg' },
            authorId: { type: 'string', format: 'uuid', example: 'ca2c7c8c-155e-42c2-8bb9-8ae0c3f05697' },
            publisherId: { type: 'string', format: 'uuid', example: '25554d3e-5266-4e97-a64f-7ddf6f518505' },
            genreIds: { type: 'array', items: { type: 'string', format: 'uuid' }, example: ['ad851da8-5377-4077-875f-888ba42ffbef'] },
          },
        },
        UpdateBookInput: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Updated Title' },
            isbn: { type: 'string', example: '9781234567890' },
            publishedYear: { type: 'number', example: 2024 },
            pageCount: { type: 'number', example: 350 },
            language: { type: 'string', example: 'English' },
            description: { type: 'string', example: 'Updated description' },
            coverImage: { type: 'string', example: 'https://example.com/new-cover.jpg' },
            authorId: { type: 'string', format: 'uuid' },
            publisherId: { type: 'string', format: 'uuid' },
            genreIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            bookId: { type: 'string', format: 'uuid' },
            userName: { type: 'string', example: 'booklover42' },
            rating: { type: 'number', minimum: 1, maximum: 5, example: 5 },
            comment: { type: 'string', example: 'Absolutely amazing book!' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateReviewInput: {
          type: 'object',
          required: ['userName', 'rating', 'comment'],
          properties: {
            userName: { type: 'string', example: 'reader123' },
            rating: { type: 'number', minimum: 1, maximum: 5, example: 5 },
            comment: { type: 'string', example: 'Excellent read!' },
          },
        },
        Author: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string', example: 'J.K.' },
            lastName: { type: 'string', example: 'Rowling' },
            birthYear: { type: 'number', example: 1965 },
            nationality: { type: 'string', example: 'British' },
            biography: { type: 'string', example: 'British author, best known for Harry Potter series' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Publisher: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Bloomsbury' },
            country: { type: 'string', example: 'UK' },
            foundedYear: { type: 'number', example: 1986 },
            website: { type: 'string', nullable: true, example: 'https://www.bloomsbury.com' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Genre: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Fantasy' },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            currentPage: { type: 'number', example: 1 },
            totalPages: { type: 'number', example: 5 },
            totalItems: { type: 'number', example: 47 },
            itemsPerPage: { type: 'number', example: 10 },
            hasNextPage: { type: 'boolean', example: true },
            hasPreviousPage: { type: 'boolean', example: false },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Validation failed' },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', example: 'isbn' },
                  message: { type: 'string', example: 'Invalid ISBN format' },
                },
              },
            },
          },
        },
      },
      parameters: {
        pageParam: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', minimum: 1, default: 1 },
          description: 'Page number',
        },
        limitParam: {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
          description: 'Number of items per page',
        },
        bookIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Book UUID',
        },
        reviewIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Review UUID',
        },
      },
    },
    tags: [
      { name: 'Books', description: 'Book management endpoints' },
      { name: 'Reviews', description: 'Review management endpoints' }
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger documentation available at http://localhost:3000/api-docs');
};