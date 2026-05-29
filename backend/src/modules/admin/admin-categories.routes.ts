import type { FastifyInstance } from 'fastify';
import {
  adminListCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} from './admin-categories.controller.js';

export default async function adminCategoryRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get('/', async () => {
    return adminListCategories(fastify);
  });

  fastify.post('/', async (request) => {
    return adminCreateCategory(fastify, request.body);
  });

  fastify.patch<{ Params: { id: string } }>('/:id', async (request) => {
    return adminUpdateCategory(fastify, request.params.id, request.body);
  });

  fastify.delete<{ Params: { id: string } }>('/:id', async (request) => {
    return adminDeleteCategory(fastify, request.params.id);
  });
}
