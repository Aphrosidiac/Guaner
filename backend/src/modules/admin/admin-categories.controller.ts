import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

function badRequest(message: string) {
  const e = new Error(message) as Error & { statusCode?: number };
  e.statusCode = 400;
  return e;
}

export async function adminListCategories(fastify: FastifyInstance) {
  const cats = await fastify.prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  return cats.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    sortOrder: c.sortOrder,
    productCount: c._count.products,
  }));
}

export async function adminCreateCategory(fastify: FastifyInstance, body: unknown) {
  const data = categorySchema.parse(body);
  const exists = await fastify.prisma.category.findUnique({ where: { slug: data.slug } });
  if (exists) throw badRequest('A collection with this slug already exists.');
  return fastify.prisma.category.create({ data });
}

export async function adminUpdateCategory(fastify: FastifyInstance, id: string, body: unknown) {
  const data = categorySchema.partial().parse(body);
  return fastify.prisma.category.update({ where: { id }, data });
}

export async function adminDeleteCategory(fastify: FastifyInstance, id: string) {
  const count = await fastify.prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    throw badRequest(`Cannot delete: ${count} product(s) are in this collection. Reassign or remove them first.`);
  }
  await fastify.prisma.category.delete({ where: { id } });
  return { ok: true };
}
