import { Author } from '../models/Author';

export const authors: Author[] = [
  {
    id: '1',
    firstName: 'J.K.',
    lastName: 'Rowling',
    birthYear: 1965,
    nationality: 'British',
    biography: 'British author, best known for Harry Potter series',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    firstName: 'George R.R.',
    lastName: 'Martin',
    birthYear: 1948,
    nationality: 'American',
    biography: 'Author of A Song of Ice and Fire',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    firstName: 'J.R.R.',
    lastName: 'Tolkien',
    birthYear: 1892,
    nationality: 'British',
    biography: 'Author of The Lord of the Rings',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '4',
    firstName: 'Stephen',
    lastName: 'King',
    birthYear: 1947,
    nationality: 'American',
    biography: 'Master of horror',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '5',
    firstName: 'Agatha',
    lastName: 'Christie',
    birthYear: 1890,
    nationality: 'British',
    biography: 'Queen of Crime',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '6',
    firstName: 'Ernest',
    lastName: 'Hemingway',
    birthYear: 1899,
    nationality: 'American',
    biography: 'Nobel Prize winner',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '7',
    firstName: 'Jane',
    lastName: 'Austen',
    birthYear: 1775,
    nationality: 'British',
    biography: 'Classic English novelist',
    createdAt: new Date('2024-01-01')
  }
];