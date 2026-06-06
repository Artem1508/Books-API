import { z } from 'zod';

export const createReviewSchema = z.object({
  userName: z.string().min(1, 'Username is required').max(100),
  rating: z.number().min(1, 'Rating must be between 1 and 5').max(5),
  comment: z.string().min(1, 'Comment is required').max(1000)
});

export const updateReviewSchema = createReviewSchema.partial();

export const reviewQuerySchema = z.object({
  rating: z.string().regex(/^[1-5]$/, 'Rating must be 1-5').optional(),
  sortBy: z.enum(['createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional().default('desc')
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReviewQueryInput = z.infer<typeof reviewQuerySchema>;