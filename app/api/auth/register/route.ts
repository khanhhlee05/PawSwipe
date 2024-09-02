import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const bcrypt = require("bcrypt")
    const hashedPassword = await bcrypt.hash(password, 10)
    await dbConnect();

    const createAccount = 
    console.log({ email, password });
  } catch (error: any) {
    console.log(error.message);
  }
}
