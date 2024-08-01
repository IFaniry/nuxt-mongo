import { z } from "zod";

const filterQuerySchema = z
  .object({
    tag: z.string(),
    author: z.string(),
    favorited: z.string(),
    limit: z.coerce.number(),
    offset: z.coerce.number(),
  })
  .partial();

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (body) =>
    filterQuerySchema.safeParse(body)
  );

  if (!result.success) {
    return [];
  }

  const limit = result.data.limit || 20;
  const offset = result.data.offset || 0;
  const author = result.data.author;

  let articles = [];
  if (author) {
    articles = await prisma.article.findMany({
      where: {
        author: {
          username: {
            equals: result.data.author,
          },
        },
      },
      take: limit,
      skip: offset,
      include: {
        author: { select: { username: true, bio: true, image: true } },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } else {
    articles = await prisma.article.findMany({
      take: limit,
      skip: offset,
      include: {
        author: { select: { username: true, bio: true, image: true } },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return articles;
});
