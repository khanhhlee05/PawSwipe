import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/mongoose/schema/User';
import { Pet } from '@/mongoose/schema/Pet';

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


   //console.log(Object.keys(data));

    for (const key in data) {
      const value = data[key];
      
      if (key === "wishlist" || key === "swipedRight") {

        if (!Array.isArray(value)) {
          throw new Error('Invalid input value')
        }
        //check for existing in ID before adding
        let userList = user[key]

        for (const petId of value ){
          const addPet = await Pet.findOne({_id: petId})

          if (!addPet) {
            throw new Error(`Pet ${petId} doesn't exist`)
          } else {
            userList.push(petId)
          }
          user[key] = userList
        }

      }  else{

      user[key] = value;
      }

    }

    const updatedUser = await user.save()

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(`${error.message}`, { status: 500})
  }


}

//delete specific user from the database

export async function DELETE(req, { params }) {
  await dbConnect();

  const { email } = params;

  if (!email) {
    return new NextResponse('Invalid request payload', { status: 400 });
  }

  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return new NextResponse('No user found', { status: 404 });
    }

    return new NextResponse('User deleted successfully', { status: 204 });
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}