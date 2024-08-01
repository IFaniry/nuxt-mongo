import { z } from "zod";
import { Prisma } from "@prisma/client";

const createArticleSchema = z.object({
  article: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    body: z.string().min(1),
    tags: z.string().array().optional(),
  }),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    createArticleSchema.safeParse(body)
  );

  if (!result.success) {
    setResponseStatus(event, 422);
    return result.error.issues;
  }

  const author = event.context.user;
  if (!author) {
    throw createError({
      statusCode: 401,
      statusMessage: "User must be authenticated",
    });
  }
  const slug = result.data.article.title.split(" ").join("-");
  try {
    const article = await prisma.article.create({
      data: {
        authorId: author._id,
        title: result.data.article.title,
        slug: slug,
        description: result.data.article.description,
        body: result.data.article.body,
        tags: result.data.article.tags,
      },
    });

    setResponseStatus(event, 201);
    return article;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        setResponseStatus(event, 422);
        return { errors: { article: "slug not unique" } };
      }
    }
    throw e;
  }
});
