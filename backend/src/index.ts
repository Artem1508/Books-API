import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET    /api/v1/books`);
  console.log(`  GET    /api/v1/books/:id`);
  console.log(`  POST   /api/v1/books`);
  console.log(`  PUT    /api/v1/books/:id`);
  console.log(`  DELETE /api/v1/books/:id`);
  console.log(`  GET    /api/v1/books/:id/reviews`);
  console.log(`  GET    /api/v1/books/:id/average-rating`);
  console.log(`  GET    /api/v1/reviews/:id`);
  console.log(`  POST   /api/v1/books/:bookId/reviews`);
  console.log(`  PUT    /api/v1/reviews/:id`);
  console.log(`  DELETE /api/v1/reviews/:id`);
});