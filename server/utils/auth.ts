import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { User } from "@prisma/client";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // IMPORTANT!
    attributes: {
      // set to `true` when using HTTPS
      secure: !process.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      _id: attributes.technicalId,
      username: attributes.username,
      email: attributes.email,
      image: attributes.image,
      bio: attributes.bio,
      followingIds: attributes.followingIds,
      followedByIds: attributes.followedByIds,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}
