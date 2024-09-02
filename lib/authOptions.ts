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

        // const users = await User.find()
        const user = await User.findOne({
          /* specify your credentials here */
        });
        if (!user) {
          return null;
        }

        return user;
        // return new NextResponse(JSON.stringify(users), {
        return new NextResponse(JSON.stringify(user), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    }),
  ],
};
