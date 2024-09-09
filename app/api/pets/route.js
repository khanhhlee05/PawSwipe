//Purpose is to handle fetching the pets from MongoDB

import dbConnect from "@/lib/mongodb";
import { Pet } from "@/mongoose/schema/Pet";
import { User } from "@/mongoose/schema/User";

// Fetching 20 pets that are not adopted in MongoDB and return them as JSON response
export async function GET(req) {
  await dbConnect();

  try {
    //const pets = await Pet.find({ isAdopted: false }).limit(20);
    const pets = await Pet.find().limit(20); // for swiping testing purposes
    return new Response(JSON.stringify(pets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Update the status of a pet to adopted in MongoDB --> should be in the user collection
export async function POST(req) {
  await dbConnect();

  const { petId, action } = await req.json();
  try {
    const pet = await Pet.findById(petId);
    if (!pet) return new Response(JSON.stringify({ message: 'Pet not found' }), { status: 404 });

    if (action === 'like') {
     //console.log(`User liked pet: ${pet.name}`); //TODO: update this so that it updates the database (swipedRight property of User collection)
    } else if (action === 'dislike') {
     //console.log(`User disliked pet: ${pet.name}`); //TODO: same update here
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}