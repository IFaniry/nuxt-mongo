import { z } from "zod";
import { verify } from "@node-rs/argon2";

import { lucia } from "~/server/utils/auth";

const userLoginSchema = z.object({
  user: z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  }),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    userLoginSchema.safeParse(body)
  );

  if (!result.success) {
    setResponseStatus(event, 422);
    return result.error.issues;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: result.data.user.email,
    },
  });

  // https://demo.realworld.io/#/
  // faniry.consulting1
  // faniry.consulting1@gmail.com
  // 123456

  // test
  // test@gmail.com
  // 123456
  if (!existingUser) {
    throw createError({
      statusCode: 403,
    });
  }
  const validPassword = await verify(
    existingUser.password,
    result.data.user.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }
  );
  if (!validPassword) {
    throw createError({
      statusCode: 403,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );

  // TODO: to implement
  return { token: "..." };
});
