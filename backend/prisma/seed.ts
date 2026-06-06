import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Очищаем таблицы
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.genre.deleteMany();

  // Создаём жанры
  const fantasy = await prisma.genre.create({ data: { name: 'Fantasy' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery' } });
  const horror = await prisma.genre.create({ data: { name: 'Horror' } });
  const romance = await prisma.genre.create({ data: { name: 'Romance' } });
  const adventure = await prisma.genre.create({ data: { name: 'Adventure' } });
  const classic = await prisma.genre.create({ data: { name: 'Classic' } });
  const crime = await prisma.genre.create({ data: { name: 'Crime' } });
  const thriller = await prisma.genre.create({ data: { name: 'Thriller' } });

  console.log('Genres created');

  // Создаём авторов
  const rowling = await prisma.author.create({
    data: {
      firstName: 'J.K.',
      lastName: 'Rowling',
      birthYear: 1965,
      nationality: 'British',
      biography: 'British author, best known for Harry Potter series',
    },
  });

  const martin = await prisma.author.create({
    data: {
      firstName: 'George R.R.',
      lastName: 'Martin',
      birthYear: 1948,
      nationality: 'American',
      biography: 'Author of A Song of Ice and Fire',
    },
  });

  const tolkien = await prisma.author.create({
    data: {
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
      birthYear: 1892,
      nationality: 'British',
      biography: 'Author of The Lord of the Rings',
    },
  });

  const king = await prisma.author.create({
    data: {
      firstName: 'Stephen',
      lastName: 'King',
      birthYear: 1947,
      nationality: 'American',
      biography: 'Master of horror',
    },
  });

  const christie = await prisma.author.create({
    data: {
      firstName: 'Agatha',
      lastName: 'Christie',
      birthYear: 1890,
      nationality: 'British',
      biography: 'Queen of Crime',
    },
  });

  console.log('Authors created');

  // Создаём издателей
  const bloomsbury = await prisma.publisher.create({
    data: {
      name: 'Bloomsbury',
      country: 'UK',
      foundedYear: 1986,
      website: 'https://www.bloomsbury.com',
    },
  });

  const bantam = await prisma.publisher.create({
    data: {
      name: 'Bantam Books',
      country: 'USA',
      foundedYear: 1945,
      website: 'https://www.bantam.com',
    },
  });

  const houghton = await prisma.publisher.create({
    data: {
      name: 'Houghton Mifflin',
      country: 'USA',
      foundedYear: 1832,
      website: 'https://www.hmhco.com',
    },
  });

  const scribner = await prisma.publisher.create({
    data: {
      name: 'Scribner',
      country: 'USA',
      foundedYear: 1846,
      website: null,
    },
  });

  console.log('Publishers created');

  // Создаём книги
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      isbn: '9780747532699',
      publishedYear: 1997,
      pageCount: 223,
      language: 'English',
      description: 'First book in the Harry Potter series',
      authorId: rowling.id,
      publisherId: bloomsbury.id,
      genres: {
        connect: [{ id: fantasy.id }, { id: adventure.id }],
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'A Game of Thrones',
      isbn: '9780553103540',
      publishedYear: 1996,
      pageCount: 694,
      language: 'English',
      description: 'First book in A Song of Ice and Fire',
      authorId: martin.id,
      publisherId: bantam.id,
      genres: {
        connect: [{ id: fantasy.id }, { id: classic.id }],
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'The Hobbit',
      isbn: '9780547928227',
      publishedYear: 1937,
      pageCount: 310,
      language: 'English',
      description: 'Classic fantasy adventure',
      authorId: tolkien.id,
      publisherId: houghton.id,
      genres: {
        connect: [{ id: fantasy.id }, { id: adventure.id }],
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'The Shining',
      isbn: '9780385121675',
      publishedYear: 1977,
      pageCount: 447,
      language: 'English',
      description: 'Horror novel about the Torrance family',
      authorId: king.id,
      publisherId: scribner.id,
      genres: {
        connect: [{ id: horror.id }],
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'Murder on the Orient Express',
      isbn: '9780062693662',
      publishedYear: 1934,
      pageCount: 256,
      language: 'English',
      description: 'Famous Hercule Poirot mystery',
      authorId: christie.id,
      publisherId: scribner.id,
      genres: {
        connect: [{ id: mystery.id }, { id: crime.id }],
      },
    },
  });

  console.log('Books created');

  // Создаём отзывы
  const books = await prisma.book.findMany();
  
  await prisma.review.create({
    data: {
      bookId: books[0].id,
      userName: 'booklover42',
      rating: 5,
      comment: 'Absolutely magical! A timeless classic.',
    },
  });

  await prisma.review.create({
    data: {
      bookId: books[0].id,
      userName: 'harryfan',
      rating: 5,
      comment: 'Best book ever written!',
    },
  });

  await prisma.review.create({
    data: {
      bookId: books[1].id,
      userName: 'fantasy_fan',
      rating: 5,
      comment: 'Epic fantasy at its best.',
    },
  });

  console.log('Reviews created');
  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });