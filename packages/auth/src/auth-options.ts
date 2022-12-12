import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import { prisma } from '@test/db';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};
