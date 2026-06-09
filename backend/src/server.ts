import Fastify from 'fastify';
import { booksRoutes } from './routes/books.routes';
const app = Fastify({ logger: true }); 

app.register(booksRoutes);

app.get('/', async () => { return { message: 'Books API with Fastify' }; });
 const start = async () => { try { await app.listen({ port: 3000 }); 
 console.log('Server started'); } catch (err) { app.log.error(err); process.exit(1); } }; 
 start();