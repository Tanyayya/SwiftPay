import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: { email?: string | null, name?: string | null }, account: { provider: "google" | "github" } }) {
      console.log("hi signin");
      
      // Check if user and user.email exist
      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true
        },
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name || "",  // Handle case where name might be null
          auth_type: account.provider === "google" ? "Google" : "Github"
        },
        update: {
          name: user.name || "",  // Handle case where name might be null
          auth_type: account.provider === "google" ? "Google" : "Github"
        }
      });

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
}
