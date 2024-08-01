export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    include: {
      author: { select: { username: true, bio: true, image: true } },
    },
  });

  return article;
});
