import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services';
import { updateReviewSchema, reviewQuerySchema } from '../validators';
import { AppError } from '../middleware';

export class ReviewController {
  static async getReviewById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const review = await ReviewService.getReviewById(id);
      
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
      
      const existingReview = await ReviewService.getReviewById(id);
      if (!existingReview) {
        throw new AppError('Review not found', 404);
      }
      
      const updatedReview = await ReviewService.updateReview(id, validatedData);
      res.json({ data: updatedReview });
    } catch (error) {
      next(error);
    }
  }
  

  static async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const existingReview = await ReviewService.getReviewById(id); 
      if (!existingReview) {
        throw new AppError('Review not found', 404);
      }
      
      await ReviewService.deleteReview(id); 
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}