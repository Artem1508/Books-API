import { Review } from '../models/Review';

export const reviews: Review[] = [
  {
    id: '1',
    bookId: '1',
    userName: 'booklover42',
    rating: 5,
    comment: 'Absolutely magical! A timeless classic that everyone should read.',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '2',
    bookId: '1',
    userName: 'harryfan',
    rating: 5,
    comment: 'Best book ever written! Cant wait to read the rest.',
    createdAt: new Date('2024-02-02')
  },
  {
    id: '3',
    bookId: '1',
    userName: 'reader123',
    rating: 4,
    comment: 'Great start to an amazing series. The world building is incredible.',
    createdAt: new Date('2024-02-03')
  },
  {
    id: '4',
    bookId: '3',
    userName: 'fantasy_fan',
    rating: 5,
    comment: 'Epic fantasy at its best. Complex characters and amazing plot.',
    createdAt: new Date('2024-02-04')
  },
  {
    id: '5',
    bookId: '3',
    userName: 'winteriscoming',
    rating: 4,
    comment: 'Complex characters, amazing world building. A bit slow at times.',
    createdAt: new Date('2024-02-05')
  },
  {
    id: '6',
    bookId: '4',
    userName: 'hobbit_lover',
    rating: 5,
    comment: 'A perfect adventure story. Bilbo is such a great character!',
    createdAt: new Date('2024-02-06')
  },
  {
    id: '7',
    bookId: '5',
    userName: 'horrorfan',
    rating: 5,
    comment: "King's masterpiece. Truly terrifying and psychologically deep.",
    createdAt: new Date('2024-02-07')
  },
  {
    id: '8',
    bookId: '5',
    userName: 'scared_reader',
    rating: 3,
    comment: 'Too scary for me, but well written. Had to sleep with lights on.',
    createdAt: new Date('2024-02-08')
  },
  {
    id: '9',
    bookId: '6',
    userName: 'mysterylover',
    rating: 5,
    comment: "A brilliant whodunnit. Christie's best work!",
    createdAt: new Date('2024-02-09')
  },
  {
    id: '10',
    bookId: '7',
    userName: 'hemingwayfan',
    rating: 4,
    comment: 'Simple yet profound. A beautiful story about persistence.',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '11',
    bookId: '8',
    userName: 'romance_reader',
    rating: 5,
    comment: 'Delightful romance. Elizabeth Bennet is an iconic character!',
    createdAt: new Date('2024-02-11')
  },
  {
    id: '12',
    bookId: '9',
    userName: 'king_fan',
    rating: 5,
    comment: 'Long but worth every page. Pennywise is terrifying!',
    createdAt: new Date('2024-02-12')
  },
  {
    id: '13',
    bookId: '10',
    userName: 'harryfan',
    rating: 5,
    comment: 'The series keeps getting better! Sirius Black is amazing.',
    createdAt: new Date('2024-02-13')
  },
  {
    id: '14',
    bookId: '12',
    userName: 'tolkien_fan',
    rating: 5,
    comment: 'The foundation of modern fantasy. A masterpiece.',
    createdAt: new Date('2024-02-14')
  },
  {
    id: '15',
    bookId: '13',
    userName: 'thriller_fan',
    rating: 4,
    comment: 'Intense and gripping. King at his psychological best.',
    createdAt: new Date('2024-02-15')
  }
];