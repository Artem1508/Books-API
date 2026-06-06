import { Genre } from './Genre';
import { Author } from './Author';
import { Publisher } from './Publisher';

export interface Book {
  id: string;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string;
  authorId: string;
  publisherId: string;
  genres: Genre[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BookWithDetails extends Book {
  author: Author;
  publisher: Publisher;
}