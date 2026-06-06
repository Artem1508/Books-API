import { prisma } from '../lib/prisma';
import { CreateBookInput, UpdateBookInput, BookQueryInput } from '../validators';

export class BookService {
  static async getAllBooks(query: BookQueryInput) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.title) {
      where.title = { contains: query.title, mode: 'insensitive' };
    }

    if (query.language) {
      where.language = { equals: query.language, mode: 'insensitive' };
    }

    if (query.year) {
      where.publishedYear = parseInt(query.year);
    }

    if (query.author) {
      where.author = {
        OR: [
          { firstName: { contains: query.author, mode: 'insensitive' } },
          { lastName: { contains: query.author, mode: 'insensitive' } },
        ],
      };
    }

    if (query.publisher) {
      where.publisher = {
        name: { contains: query.publisher, mode: 'insensitive' },
      };
    }

    if (query.genre) {
      where.genres = {
        some: {
          name: { equals: query.genre, mode: 'insensitive' },
        },
      };
    }

    let orderBy: any = {};
    if (query.sortBy === 'title') {
      orderBy = { title: query.order || 'asc' };
    } else if (query.sortBy === 'publishedYear') {
      orderBy = { publishedYear: query.order || 'asc' };
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          author: true,
          publisher: true,
          genres: true,
        },
      }),
      prisma.book.count({ where }),
    ]);

    return { data: books, total };
  }

  static async getBookById(id: string) {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        publisher: true,
        genres: true,
      },
    });
    return book;
  }

  static async createBook(data: CreateBookInput) {
    const book = await prisma.book.create({
      data: {
        title: data.title,
        isbn: data.isbn,
        publishedYear: data.publishedYear,
        pageCount: data.pageCount,
        language: data.language,
        description: data.description,
        coverImage: data.coverImage,
        authorId: data.authorId,
        publisherId: data.publisherId,
        genres: {
          connect: data.genreIds.map(id => ({ id })),
        },
      },
      include: {
        author: true,
        publisher: true,
        genres: true,
      },
    });
    return book;
  }

  static async updateBook(id: string, data: UpdateBookInput) {

    const updateData: any = {
      title: data.title,
      isbn: data.isbn,
      publishedYear: data.publishedYear,
      pageCount: data.pageCount,
      language: data.language,
      description: data.description,
      coverImage: data.coverImage,
      authorId: data.authorId,
      publisherId: data.publisherId,
    };

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    if (data.genreIds && data.genreIds.length > 0) {
      updateData.genres = {
        set: data.genreIds.map(id => ({ id })),
      };
    }

    const book = await prisma.book.update({
      where: { id },
      data: updateData,
      include: {
        author: true,
        publisher: true,
        genres: true,
      },
    });
    return book;
  }

  static async deleteBook(id: string) {
    await prisma.book.delete({ where: { id } });
    return true;
  }

  static async getBookReviews(bookId: string) {
    const reviews = await prisma.review.findMany({
      where: { bookId },
      orderBy: { createdAt: 'desc' },
    });
    return reviews;
  }

  static async getAverageRating(bookId: string) {
    const result = await prisma.review.aggregate({
      where: { bookId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return {
      averageRating: result._avg.rating || 0,
      totalReviews: result._count.rating || 0,
    };
  }

  static async checkAuthorExists(authorId: string): Promise<boolean> {
    const author = await prisma.author.findUnique({
      where: { id: authorId },
    });
    return !!author;
  }

  static async checkPublisherExists(publisherId: string): Promise<boolean> {
    const publisher = await prisma.publisher.findUnique({
      where: { id: publisherId },
    });
    return !!publisher;
  }

  static async checkGenresExist(genreIds: string[]): Promise<boolean> {
    const genres = await prisma.genre.findMany({
      where: { id: { in: genreIds } },
    });
    return genres.length === genreIds.length;
  }
}