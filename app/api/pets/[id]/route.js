//This code allows us to mark the pet as adopted
import dbConnect from "@/lib/mongodb";
import { Pet } from "@/mongoose/schema/Pet";


//use to adopt a pet. change the status of the pet from not found to successfully adopted.
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