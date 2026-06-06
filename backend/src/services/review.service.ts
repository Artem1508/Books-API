import { prisma } from '../lib/prisma';
import { CreateReviewInput, UpdateReviewInput, ReviewQueryInput } from '../validators';

export class ReviewService {
  static async getBookReviews(bookId: string, query: ReviewQueryInput) {
    const where: any = { bookId };

    if (query.rating) {
      where.rating = parseInt(query.rating);
    }

    const orderBy: any = {};
    if (query.sortBy === 'createdAt') {
      orderBy.createdAt = query.order || 'desc';
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy,
    });

    return {
      data: reviews,
      total: reviews.length,
    };
  }

  static async getReviewById(id: string) {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    return review;
  }

  static async createReview(bookId: string, data: CreateReviewInput) {
    const review = await prisma.review.create({
      data: {
        bookId,
        userName: data.userName,
        rating: data.rating,
        comment: data.comment,
      },
    });
    return review;
  }

  static async updateReview(id: string, data: UpdateReviewInput) {
    const updateData: any = {
      userName: data.userName,
      rating: data.rating,
      comment: data.comment,
    };

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const review = await prisma.review.update({
      where: { id },
      data: updateData,
    });
    return review;
  }

  static async deleteReview(id: string) {
    await prisma.review.delete({ where: { id } });
    return true;
  }
}