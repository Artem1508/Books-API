import { Router } from 'express';
import { BookController } from '../controllers';

const router = Router();


router.get('/', BookController.getAllBooks);

router.post('/', BookController.createBook);

router.get('/:id/reviews', BookController.getBookReviews);

router.post('/:id/reviews', BookController.createReview);

router.get('/:id/average-rating', BookController.getAverageRating);

router.get('/:id', BookController.getBookById);

router.put('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export default router;