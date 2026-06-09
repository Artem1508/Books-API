import { FastifyInstance } from 'fastify'; 
import { getAllBooks } from '../controllers/books.controller'; 
export async function booksRoutes(app: FastifyInstance) { 
    app.get('/books', getAllBooks); 
}