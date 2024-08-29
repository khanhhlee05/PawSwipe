//This code allows us to mark the pet as adopted
import dbConnect from '../../../../utils/dbConnect';
import Pet from '../../../../models/Pet';

export async function POST(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const pet = await Pet.findByIdAndUpdate(id, { isAdopted: true });
    if (!pet) return new Response(JSON.stringify({ message: 'Pet not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Pet adopted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}