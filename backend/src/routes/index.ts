import { Router } from 'express';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';

const router = Router();

router.use('/api/v1/books', bookRoutes);
router.use('/api/v1/reviews', reviewRoutes);

export default router;