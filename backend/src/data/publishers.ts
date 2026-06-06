import { Publisher } from '../models/Publisher';

export const publishers: Publisher[] = [
  {
    id: '1',
    name: 'Bloomsbury',
    country: 'UK',
    foundedYear: 1986,
    website: 'https://www.bloomsbury.com',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Bantam Books',
    country: 'USA',
    foundedYear: 1945,
    website: 'https://www.bantam.com',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Houghton Mifflin',
    country: 'USA',
    foundedYear: 1832,
    website: 'https://www.hmhco.com',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Scribner',
    country: 'USA',
    foundedYear: 1846,
    website: "",
    createdAt: new Date('2024-01-01')
  }
];