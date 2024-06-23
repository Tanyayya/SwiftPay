import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { AuthOptions, Account, User } from "next-auth";
import db from "@repo/db/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }): Promise<boolean> {
      console.log("hi signin");

      // Check if user and user.email exist
      if (!user || !user.email || !account) {
        return false;
      }

      await db.merchant.upsert({
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name || "", // Handle case where name might be null
          auth_type: account.provider === "google" ? "Google" : "Github"
        },
        update: {
          name: user.name || "", // Handle case where name might be null
          auth_type: account.provider === "google" ? "Google" : "Github"
        }
      });

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};


