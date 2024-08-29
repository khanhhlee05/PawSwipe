//Purpose is to handle fetching the pets from MongoDB

import dbConnect from '../../../utils/dbConnect';
import Pet from '../../../models/Pet';

export async function GET(req) {
  await dbConnect();

  try {
    const pets = await Pet.find({ isAdopted: false }).limit(20);
    return new Response(JSON.stringify(pets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  const { petId, action } = await req.json();
  try {
    const pet = await Pet.findById(petId);
    if (!pet) return new Response(JSON.stringify({ message: 'Pet not found' }), { status: 404 });

    if (action === 'like') {
      console.log(`User liked pet: ${pet.name}`);
    } else if (action === 'dislike') {
      console.log(`User disliked pet: ${pet.name}`);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}