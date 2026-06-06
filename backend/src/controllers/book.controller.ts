import { Request, Response, NextFunction } from 'express';
import { BookService, ReviewService } from '../services';
import { createBookSchema, updateBookSchema, bookQuerySchema, createReviewSchema } from '../validators';
import { AppError } from '../middleware';

export class BookController {
  static async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedQuery = bookQuerySchema.parse(req.query);
      const { data, total } = await BookService.getAllBooks(validatedQuery);  // <- ДОБАВИТЬ await
      
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
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const book = await BookService.getBookById(id); 
      
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

      const authorExists = await BookService.checkAuthorExists(validatedData.authorId);
      if (!authorExists) {
        throw new AppError('Author not found', 404);
      }
    
      const publisherExists = await BookService.checkPublisherExists(validatedData.publisherId);
      if (!publisherExists) {
        throw new AppError('Publisher not found', 404);
      }

      const genresExist = await BookService.checkGenresExist(validatedData.genreIds);
      if (!genresExist) {
        throw new AppError('One or more genres not found', 404);
      }
      
      const newBook = await BookService.createBook(validatedData); 
      res.status(201).json({ data: newBook });
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateBookSchema.parse(req.body);

      const existingBook = await BookService.getBookById(id);
      if (!existingBook) {
        throw new AppError('Book not found', 404);
      }

      if (validatedData.genreIds && validatedData.genreIds.length > 0) {
        const genresExist = await BookService.checkGenresExist(validatedData.genreIds);
        if (!genresExist) {
          throw new AppError('One or more genres not found', 404);
        }
      }
      
      const updatedBook = await BookService.updateBook(id, validatedData);
      res.json({ data: updatedBook });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const existingBook = await BookService.getBookById(id);
      if (!existingBook) {
        throw new AppError('Book not found', 404);
      }
      
      await BookService.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getBookReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const book = await BookService.getBookById(id);
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      const reviews = await BookService.getBookReviews(id);
      res.json({ data: reviews });
    } catch (error) {
      next(error);
    }
  }

  static async getAverageRating(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const book = await BookService.getBookById(id);
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      const { averageRating, totalReviews } = await BookService.getAverageRating(id); 
      res.json({ 
        data: {
          bookId: id,
          averageRating,
          totalReviews
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = createReviewSchema.parse(req.body);
      
      const book = await BookService.getBookById(id);
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      const newReview = await ReviewService.createReview(id, validatedData);
      res.status(201).json({ data: newReview });
    } catch (error) {
      next(error);
    }
  }
}