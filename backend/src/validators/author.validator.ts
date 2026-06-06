import { z } from 'zod';

export const createAuthorSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  birthYear: z.number().min(500).max(new Date().getFullYear()),
  nationality: z.string().min(1),
  biography: z.string().max(5000).optional()
});

export const updateAuthorSchema = createAuthorSchema.partial();