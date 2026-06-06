import { Router } from 'express';
import { ReviewController } from '../controllers';

const router = Router();

router.get('/books/:bookId/reviews', ReviewController.getBookReviews);

router.get('/:id', ReviewController.getReviewById);

router.put('/:id', ReviewController.updateReview);

router.delete('/:id', ReviewController.deleteReview);

export default router;