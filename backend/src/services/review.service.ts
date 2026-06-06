import { v4 as uuidv4 } from 'uuid';
import { reviews } from '../data/reviews';
import { Review } from '../models/Review';
import { CreateReviewInput, UpdateReviewInput, ReviewQueryInput } from '../validators';

export class ReviewService {

  static getBookReviews(bookId: string, query: ReviewQueryInput): { data: Review[]; total: number } {
    let filteredReviews = reviews.filter(r => r.bookId === bookId);

    if (query.rating) {
      filteredReviews = filteredReviews.filter(r => r.rating === parseInt(query.rating!));
    }

    if (query.sortBy === 'createdAt') {
      filteredReviews.sort((a, b) => {
        const comparison = a.createdAt.getTime() - b.createdAt.getTime();
        return query.order === 'asc' ? comparison : -comparison;
      });
    }
    
    return {
      data: filteredReviews,
      total: filteredReviews.length
    };
  }

  static getReviewById(id: string): Review | null {
    return reviews.find(r => r.id === id) || null;
  }

  static createReview(bookId: string, data: CreateReviewInput): Review {
    const newReview: Review = {
      id: uuidv4(),
      bookId,
      userName: data.userName,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date()
    };
    
    reviews.push(newReview);
    return newReview;
  }

  static updateReview(id: string, data: UpdateReviewInput): Review | null {
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) return null;
    
    const updatedReview: Review = {
      ...reviews[reviewIndex],
      userName: data.userName ?? reviews[reviewIndex].userName,
      rating: data.rating ?? reviews[reviewIndex].rating,
      comment: data.comment ?? reviews[reviewIndex].comment
    };
    
    reviews[reviewIndex] = updatedReview;
    return updatedReview;
  }

  static deleteReview(id: string): boolean {
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) return false;
    
    reviews.splice(reviewIndex, 1);
    return true;
  }
}