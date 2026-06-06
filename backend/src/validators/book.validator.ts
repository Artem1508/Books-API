import { z } from 'zod';

// Схема для создания книги
export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  isbn: z.string().regex(/^\d{10}|\d{13}$/, 'ISBN must be 10 or 13 digits'),
  publishedYear: z.number()
    .min(1450, 'Year must be at least 1450')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  pageCount: z.number().min(1, 'Page count must be at least 1').max(10000),
  language: z.string().min(1, 'Language is required'),
  description: z.string().min(10, 'Description too short').max(5000),
  coverImage: z.string().url('Must be a valid URL').optional(),
  authorId: z.string().min(1, 'Author ID is required'),
  publisherId: z.string().min(1, 'Publisher ID is required'),
  genreIds: z.array(z.string()).min(1, 'At least one genre is required')
});

export const updateBookSchema = createBookSchema.partial();

export const bookQuerySchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.string().optional(),
  language: z.string().optional(),
  year: z.string().regex(/^\d+$/, 'Year must be a number').optional(),
  publisher: z.string().optional(),
  sortBy: z.enum(['title', 'publishedYear']).optional(),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.string().regex(/^\d+$/, 'Page must be a number').optional().default('1'),
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional().default('10')
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type BookQueryInput = z.infer<typeof bookQuerySchema>;