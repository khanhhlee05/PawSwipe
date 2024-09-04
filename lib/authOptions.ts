import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import { User } from "@/mongoose/schema/User";
import { NextResponse } from "next/server";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        await dbConnect();

        try {
          const user = await (User as any).login(
            credentials.email,
            credentials.password
          );
          return {
            id: user?._id,
            email: user?.email,
          };
        } catch (error) {
          console.error(error.message);
          return null; // Return null if login fails
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async signIn({ user, account, profile }) {
      await dbConnect(); // Ensure DB connection
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Create a new user if they don't exist
        const nameParts = user.name.split(" ");
        const newUser = new User({
          firstName: nameParts[0],
          lastName: nameParts[1],
          email: user.email,
        });
        try {
          await newUser.save();
        } catch (error) {
          console.error("Error saving new user:", error);
          return false; // Prevent sign in on error
        }
      }

      return true; // Allow sign in
    },
  },
};
