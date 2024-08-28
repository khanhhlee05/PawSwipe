import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/mongoose/schema/User';

//fetch specific users from the database
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

//update specific user in the database
export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { email } = params;

    const user = await User.findOne({ email });

    let data

    try {
      data = await req.json();
    } catch (error) {
      return new NextResponse('Invalid JSON input', { status: 400 });
    }


    console.log(Object.keys(data));

    for (const key in data) {

      const value = data[key];
      user[key] = value;

    }

    const updatedUser = await user.save()

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(`${error.message}`, { status: 500})
  }


}
