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

        const user = await User.findOne({
          email: credentials?.email,
        });

        if (!user) {
          return new NextResponse("User doesn't exist!", { status: 400 });
        }

        /* Todo: Add the credentials comparison for the db password and the credentials password */
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect(); // Ensure DB connection
      const existingUser = await User.findOne({ email: user.email });
      
      if (!existingUser) {
        // Create a new user if they don't exist
        const nameParts = user.name.split(" ")
        console.log(nameParts)
        const newUser = new User({
          firstName: nameParts[0],
          lastName: nameParts[1],
          email: user.email,
        });
        await newUser.save();
      }

      return true; // Allow sign in
    },
  },
};
