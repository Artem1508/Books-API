import { FastifyReply, FastifyRequest } from 'fastify'; 
import { prisma } from '../lib/prisma'; 
export async function getAllBooks( request: FastifyRequest, reply: FastifyReply ) { 
    const books = await prisma.book.findMany({ include: { author: true, genres: true } });
     return reply.send(books); 
    }