import { z } from "zod";
import { hash } from "@node-rs/argon2";
import { generateId } from "lucia";
import { Prisma } from "@prisma/client";

import { lucia } from "~/server/utils/auth";

const createUserSchema = z.object({
  user: z.object({
    username: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(1),
  }),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    createUserSchema.safeParse(body)
  );

  if (!result.success) {
    setResponseStatus(event, 422);
    return result.error.issues;
  }

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: result.data.user.username,
        },
        { email: result.data.user.email },
      ],
    },
  });

  // test
  // test@gmail.com
  // 123456
  if (userAlreadyExists) {
    setResponseStatus(event, 422);
    return { errors: { user: "already exists" } };
  }

  const passwordHash = await hash(result.data.user.password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateId(15);
  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        email: result.data.user.email,
        username: result.data.user.username,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );

    setResponseStatus(event, 201);
    return user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        setResponseStatus(event, 422);
        return { errors: { user: "already exists" } };
      }
    }
    throw e;
  }
});
