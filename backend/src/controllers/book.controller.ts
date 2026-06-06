import { Request, Response, NextFunction } from 'express';
import { BookService, ReviewService } from '../services';
import { createBookSchema, updateBookSchema, bookQuerySchema, createReviewSchema } from '../validators';
import { AppError } from '../middleware';
import { genres } from '../data';

export class BookController {
  static async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedQuery = bookQuerySchema.parse(req.query);
      const { data, total } = BookService.getAllBooks(validatedQuery);
      
      const page = parseInt(validatedQuery.page || '1');
      const limit = parseInt(validatedQuery.limit || '10');
      const totalPages = Math.ceil(total / limit);
      
      res.json({
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const book = BookService.getBookById(id);
      
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      res.json({ data: book });
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createBookSchema.parse(req.body);

      if (!BookService.checkAuthorExists(validatedData.authorId)) {
        throw new AppError('Author not found', 404);
      }

      if (!BookService.checkPublisherExists(validatedData.publisherId)) {
        throw new AppError('Publisher not found', 404);
      }
      for (const genreId of validatedData.genreIds) {
            const genreExists = genres.some(g => g.id === genreId);
            if (!genreExists) {
                throw new AppError(`Genre with id ${genreId} not found`, 404);
            }
      }
      const newBook = BookService.createBook(validatedData);
      res.status(201).json({ data: newBook });
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateBookSchema.parse(req.body);
      
      const updatedBook = BookService.updateBook(id, validatedData);
      
      if (!updatedBook) {
        throw new AppError('Book not found', 404);
      }
      
      res.json({ data: updatedBook });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = BookService.deleteBook(id);
      
      if (!deleted) {
        throw new AppError('Book not found', 404);
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getBookReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const book = BookService.getBookById(id);
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      const reviews = BookService.getBookReviews(id);
      res.json({ data: reviews });
    } catch (error) {
      next(error);
    }
  }
    static async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params; // Здесь id - это bookId из URL
            const validatedData = createReviewSchema.parse(req.body);
            
            // Проверяем существование книги
            const book = BookService.getBookById(id);
            if (!book) {
            throw new AppError('Book not found', 404);
            }
            
            const newReview = ReviewService.createReview(id, validatedData);
            res.status(201).json({ data: newReview });
        } catch (error) {
            next(error);
        }
    }
  static async getAverageRating(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const book = BookService.getBookById(id);
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      const averageRating = BookService.getAverageRating(id);
      res.json({ 
        data: {
          bookId: id,
          averageRating,
          totalReviews: BookService.getBookReviews(id).length
        }
      });
    } catch (error) {
      next(error);
    }
  }
}