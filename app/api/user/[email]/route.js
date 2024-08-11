import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/mongoose/schema/User';

export async function GET(req, { params }) {
  await dbConnect();

  const { email } = params;

  if (!email) {
    return new NextResponse('Invalid request payload', { status: 400 });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse('No user found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}
