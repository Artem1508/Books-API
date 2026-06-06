import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services';
import { BookService } from '../services';
import { createReviewSchema, updateReviewSchema, reviewQuerySchema } from '../validators';
import { AppError } from '../middleware';

export class ReviewController {
  static async getBookReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId } = req.params;
      const validatedQuery = reviewQuerySchema.parse(req.query);

      const book = BookService.getBookById(bookId);
      if (!book) {
        throw new AppError('Book not found', 404);
      }
      
      const { data, total } = ReviewService.getBookReviews(bookId, validatedQuery);
      res.json({ data, total });
    } catch (error) {
      next(error);
    }
  }

  static async getReviewById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const review = ReviewService.getReviewById(id);
      
      if (!review) {
        throw new AppError('Review not found', 404);
      }
      
      res.json({ data: review });
    } catch (error) {
      next(error);
    }
  }


  static async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateReviewSchema.parse(req.body);
      
      const updatedReview = ReviewService.updateReview(id, validatedData);
      
      if (!updatedReview) {
        throw new AppError('Review not found', 404);
      }
      
      res.json({ data: updatedReview });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = ReviewService.deleteReview(id);
      
      if (!deleted) {
        throw new AppError('Review not found', 404);
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}