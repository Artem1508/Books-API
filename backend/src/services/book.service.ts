import { v4 as uuidv4 } from 'uuid';
import { books } from '../data/books';
import { authors } from '../data/authors';
import { publishers } from '../data/publishers';
import { genres } from '../data/genres';
import { reviews } from '../data/reviews';
import { Book, BookWithDetails } from '../models/Book';
import { CreateBookInput, UpdateBookInput, BookQueryInput } from '../validators';

export class BookService {

  private static generateNextId(): string {
    const maxId = Math.max(...books.map(book => parseInt(book.id)).filter(id => !isNaN(id)), 0);
    return (maxId + 1).toString();
  }

  static getAllBooks(query: BookQueryInput): { data: BookWithDetails[]; total: number } {
    let filteredBooks = [...books];

    if (query.title) {
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(query.title!.toLowerCase())
      );
    }

    if (query.author) {
      filteredBooks = filteredBooks.filter(book => {
        const author = authors.find(a => a.id === book.authorId);
        return author && (author.firstName.toLowerCase().includes(query.author!.toLowerCase()) ||
                         author.lastName.toLowerCase().includes(query.author!.toLowerCase()));
      });
    }

    if (query.genre) {
      filteredBooks = filteredBooks.filter(book =>
        book.genres.some(g => g.name.toLowerCase() === query.genre!.toLowerCase())
      );
    }

    if (query.language) {
      filteredBooks = filteredBooks.filter(book =>
        book.language.toLowerCase() === query.language!.toLowerCase()
      );
    }

    if (query.year) {
      filteredBooks = filteredBooks.filter(book =>
        book.publishedYear === parseInt(query.year!)
      );
    }

    if (query.publisher) {
      filteredBooks = filteredBooks.filter(book => {
        const publisher = publishers.find(p => p.id === book.publisherId);
        return publisher && publisher.name.toLowerCase().includes(query.publisher!.toLowerCase());
      });
    }

    if (query.sortBy) {
      filteredBooks.sort((a, b) => {
        let comparison = 0;
        if (query.sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (query.sortBy === 'publishedYear') {
          comparison = a.publishedYear - b.publishedYear;
        }
        return query.order === 'asc' ? comparison : -comparison;
      });
    }

    const page = parseInt(query.page!);
    const limit = parseInt(query.limit!);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    const booksWithDetails: BookWithDetails[] = paginatedBooks.map(book => {
      const author = authors.find(a => a.id === book.authorId)!;
      const publisher = publishers.find(p => p.id === book.publisherId)!;
      return { ...book, author, publisher };
    });

    return {
      data: booksWithDetails,
      total: filteredBooks.length
    };
  }

  static getBookById(id: string): BookWithDetails | null {
    const book = books.find(b => b.id === id);
    if (!book) return null;
    
    const author = authors.find(a => a.id === book.authorId)!;
    const publisher = publishers.find(p => p.id === book.publisherId)!;
    return { ...book, author, publisher };
  }

  static createBook(data: CreateBookInput): BookWithDetails {
    const selectedGenres = genres.filter(g => data.genreIds.includes(g.id));
    
    const newBook: Book = {
      id: this.generateNextId(),
      title: data.title,
      isbn: data.isbn,
      publishedYear: data.publishedYear,
      pageCount: data.pageCount,
      language: data.language,
      description: data.description,
      coverImage: data.coverImage,
      authorId: data.authorId,
      publisherId: data.publisherId,
      genres: selectedGenres,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    books.push(newBook);
    
    const author = authors.find(a => a.id === newBook.authorId)!;
    const publisher = publishers.find(p => p.id === newBook.publisherId)!;
    return { ...newBook, author, publisher };
  }

  static updateBook(id: string, data: UpdateBookInput): BookWithDetails | null {
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return null;
    
    const existingBook = books[bookIndex];

    let updatedGenres = existingBook.genres;
    if (data.genreIds) {
      updatedGenres = genres.filter(g => data.genreIds!.includes(g.id));
    }
    
    const updatedBook: Book = {
      ...existingBook,
      title: data.title ?? existingBook.title,
      isbn: data.isbn ?? existingBook.isbn,
      publishedYear: data.publishedYear ?? existingBook.publishedYear,
      pageCount: data.pageCount ?? existingBook.pageCount,
      language: data.language ?? existingBook.language,
      description: data.description ?? existingBook.description,
      coverImage: data.coverImage ?? existingBook.coverImage,
      authorId: data.authorId ?? existingBook.authorId,
      publisherId: data.publisherId ?? existingBook.publisherId,
      genres: updatedGenres,
      updatedAt: new Date()
    };
    
    books[bookIndex] = updatedBook;
    
    const author = authors.find(a => a.id === updatedBook.authorId)!;
    const publisher = publishers.find(p => p.id === updatedBook.publisherId)!;
    return { ...updatedBook, author, publisher };
  }

  static deleteBook(id: string): boolean {
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return false;
    
    books.splice(bookIndex, 1);
    return true;
  }

  static getBookReviews(bookId: string) {
    return reviews.filter(r => r.bookId === bookId);
  }

  static getAverageRating(bookId: string): number {
    const bookReviews = reviews.filter(r => r.bookId === bookId);
    if (bookReviews.length === 0) return 0;
    
    const sum = bookReviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / bookReviews.length).toFixed(1));
  }

  static checkAuthorExists(authorId: string): boolean {
    return authors.some(a => a.id === authorId);
  }

  static checkPublisherExists(publisherId: string): boolean {
    return publishers.some(p => p.id === publisherId);
  }
}