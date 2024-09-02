import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/mongoose/schema/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();
    const data = { email, password };
    console.log(data);
    if (!data) {
      return new NextResponse("Invalid request payload", { status: 400 });
    }

    const user = new User(data);
    console.log(user)
    const savedUser = await user.save();
    if (!savedUser) {
      return new NextResponse("Failed to save user", { status: 500 });
    }

    return new NextResponse(JSON.stringify(savedUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return new NextResponse("Invalid JSON input", { status: 400 });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
