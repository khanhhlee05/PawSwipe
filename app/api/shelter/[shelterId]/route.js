import { User } from "@/mongoose/schema/User";
import { Shelter } from "@/mongoose/schema/Shelter";
import { NextResponse } from "next/server";


//fetch a specific shelter
export async function GET(req, { params }) {
    try {
        const { shelterId } = params

        const myShelter = await Shelter.findById(shelterId)

        if (!myShelter) {
            return new NextResponse("Shelter not found", { status: 404 })

        }

        return new NextResponse(JSON.stringify(myShelter), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }

}