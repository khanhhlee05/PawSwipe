import { User } from "@/mongoose/schema/User";
import { Shelter } from "@/mongoose/schema/Shelter";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";



//fetch a specific shelter
export async function GET(req, { params }) {
    try {
        await dbConnect()
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

//delete a specific shelter
export async function DELETE(req, { params }) {
    try {
        await dbConnect()
        const { shelterId } = params

        const deletedShelter = await Shelter.findByIdAndDelete(shelterId)

        if (!deletedShelter) {
            return new NextResponse("Cannot delete shelter", { status: 404 })
        }

        return new NextResponse(JSON.stringify(deletedShelter), { status: 200 })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}

//update a specific shelter
export async function PATCH(req, { params }) {
    try {
        await dbConnect()
        const { shelterId } = params

        const updatedShelter = await Shelter.findById(shelterId)

        if (!updatedShelter) {
            return new NextResponse("Shelter does not exist", { status: 404 })
        }

        const data = await req.json()

        if (!data) {
            return new NextResponse("Invalid request payload", { status: 400 })
        }
    
        for (const key in data) {
          
            if (key === "staffId") {
                const staff = await User.findById(data[key])
                if (!staff) {
                    return new NextResponse("Staff not found", { status: 404 })
                }
                updatedShelter[key] = data[key]
            } else {
               //console.log(key, data[key])
                updatedShelter[key] = data[key]
            }
        }

        const confirmedUpdatedShelter = await updatedShelter.save()

        if (!confirmedUpdatedShelter) {
            return new NextResponse("Failed to update shelter", { status: 500 })
        }

        return new NextResponse(JSON.stringify(confirmedUpdatedShelter), {
            status: 200, headers:
                { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })

    }
}