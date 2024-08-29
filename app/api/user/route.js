import dbConnect from "@/lib/mongodb";
import { User } from "@/mongoose/schema/User";
import { NextResponse } from 'next/server';

//Create new email address in to MongoDB
export async function POST(req) {
    await dbConnect(); 
  
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return new NextResponse('Invalid JSON input', { status: 400 });
    }
  
    if (!data) {
      return new NextResponse('Invalid request payload', { status: 400 });
    }
    
    const user = new User(data);
    const confirmedEmail = await user.save()

    if (!confirmedEmail) {
      return new NextResponse('Failed to save user', { status: 500 });
    }

    return new NextResponse(JSON.stringify(confirmedEmail), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
  }

export async function GET(req){
    await dbConnect();
    
    let data;
    try {
        data = await req.json();
    }catch (error) {
        console.log(error);
        return new NextResponse('Invalid JSON input', { status: 400 });
      }
    
      if (!data){
        return new NextResponse('Invalid request payload', { status: 400 });
      }

    const users = await User.findOne(data)
    if (!users) {
        return new NextResponse('No user found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(users), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
}