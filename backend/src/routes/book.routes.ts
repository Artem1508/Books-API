import { Router } from 'express';
import { BookController } from '../controllers';

const router = Router();

/**
 * @openapi
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *         description: Number of items per page
 *       - in: query
 *         name: title
 *         schema: { type: string }
 *         description: Filter by title (partial match)
 *       - in: query
 *         name: author
 *         schema: { type: string }
 *         description: Filter by author name (partial match)
 *       - in: query
 *         name: genre
 *         schema: { type: string }
 *         description: Filter by genre name (exact match)
 *       - in: query
 *         name: language
 *         schema: { type: string }
 *         description: Filter by language (exact match)
 *       - in: query
 *         name: year
 *         schema: { type: integer }
 *         description: Filter by publication year
 *       - in: query
 *         name: publisher
 *         schema: { type: string }
 *         description: Filter by publisher name (partial match)
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [title, publishedYear] }
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], default: asc }
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid }
 *                       title: { type: string }
 *                       isbn: { type: string }
 *                       publishedYear: { type: number }
 *                       pageCount: { type: number }
 *                       language: { type: string }
 *                       description: { type: string }
 *                       coverImage: { type: string, nullable: true }
 *                       authorId: { type: string, format: uuid }
 *                       publisherId: { type: string, format: uuid }
 *                       author: { type: object }
 *                       publisher: { type: object }
 *                       genres: { type: array }
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage: { type: number }
 *                     totalPages: { type: number }
 *                     totalItems: { type: number }
 *                     itemsPerPage: { type: number }
 *                     hasNextPage: { type: boolean }
 *                     hasPreviousPage: { type: boolean }
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error: { type: string }
 *                 details: { type: array }
 */
router.get('/', BookController.getAllBooks);

/**
 * @openapi
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - isbn
 *               - publishedYear
 *               - pageCount
 *               - language
 *               - description
 *               - authorId
 *               - publisherId
 *               - genreIds
 *             properties:
 *               title: { type: string, example: "The Midnight Library" }
 *               isbn: { type: string, example: "9780525559474" }
 *               publishedYear: { type: number, example: 2020 }
 *               pageCount: { type: number, example: 304 }
 *               language: { type: string, example: "English" }
 *               description: { type: string, example: "Between life and death there is a library." }
 *               coverImage: { type: string, example: "https://example.com/cover.jpg" }
 *               authorId: { type: string, format: uuid }
 *               publisherId: { type: string, format: uuid }
 *               genreIds: { type: array, items: { type: string, format: uuid } }
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Author, publisher or genre not found
 */
router.post('/', BookController.createBook);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Book UUID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid }
 *                     title: { type: string }
 *                     isbn: { type: string }
 *                     publishedYear: { type: number }
 *                     pageCount: { type: number }
 *                     language: { type: string }
 *                     description: { type: string }
 *                     coverImage: { type: string, nullable: true }
 *                     authorId: { type: string, format: uuid }
 *                     publisherId: { type: string, format: uuid }
 *                     author: { type: object }
 *                     publisher: { type: object }
 *                     genres: { type: array }
 *       404:
 *         description: Book not found
 */
router.get('/:id', BookController.getBookById);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Book UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               isbn: { type: string }
 *               publishedYear: { type: number }
 *               pageCount: { type: number }
 *               language: { type: string }
 *               description: { type: string }
 *               coverImage: { type: string }
 *               authorId: { type: string, format: uuid }
 *               publisherId: { type: string, format: uuid }
 *               genreIds: { type: array, items: { type: string, format: uuid } }
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Validation error
 */
router.put('/:id', BookController.updateBook);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Book UUID
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/:id', BookController.deleteBook);

/**
 * @openapi
 * /api/v1/books/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Book UUID
 *       - in: query
 *         name: rating
 *         schema: { type: integer, minimum: 1, maximum: 5 }
 *         description: Filter by rating
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [createdAt] }
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], default: desc }
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, format: uuid }
 *                       bookId: { type: string, format: uuid }
 *                       userName: { type: string }
 *                       rating: { type: number }
 *                       comment: { type: string }
 *                       createdAt: { type: string, format: date-time }
 *       404:
 *         description: Book not found
 */
router.get('/:id/reviews', BookController.getBookReviews);

/**
 * @openapi
 * /api/v1/books/{id}/reviews:
 *   post:
 *     summary: Add a review to a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Book UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - rating
 *               - comment
 *             properties:
 *               userName: { type: string, example: "booklover42" }
 *               rating: { type: number, minimum: 1, maximum: 5, example: 5 }
 *               comment: { type: string, example: "Amazing book!" }
 *     responses:
 *       201:
 *         description: Review created successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Validation error
 */
router.post('/:id/reviews', BookController.createReview);

/**
 * @openapi
 * /api/v1/books/{id}/average-rating:
 *   get:
 *     summary: Get average rating for a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Book UUID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     bookId: { type: string, format: uuid }
 *                     averageRating: { type: number, example: 4.5 }
 *                     totalReviews: { type: number, example: 12 }
 *       404:
 *         description: Book not found
 */
router.get('/:id/average-rating', BookController.getAverageRating);

export default router;