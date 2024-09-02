import dbConnect from "@/lib/mongodb";
import { Breed } from "@/mongoose/schema/Breed";
import { NextResponse } from "next/server";


//fetch a specific breed 
export async function GET(req, { params }) {
    try {
        await dbConnect()

        const { breedId } = params;

        if (!breedId) {
            return new NextResponse('Invalid request payload', { status: 400 });
        }

        const myBreed = await Breed.findById(breedId)

        if (!myBreed) {
            return new NextResponse('No breed found', { status: 404 });
        }

        return new NextResponse(JSON.stringify(myBreed), { status: 200, headers: { 'Content-Type': 'application/json' } })

    } catch (error) {
        return new NextResponse(error.message, { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}

//delete a specific breed from the collection
export async function DELETE(req, { params }) {
    try {
        await dbConnect()
        const { breedId } = params;

        if (!breedId) {
            return new NextResponse("Invalid Request Payload", { status: 500 })
        }

        const deleteBreed = await Breed.findByIdAndDelete(breedId)

        if (!deleteBreed) {
            return new NextResponse('No breed found to delete', { status: 404 })
        }

        return new NextResponse(JSON.stringify(deleteBreed), { status: 200, headers: { 'Content-Type': "application/json" } })



    } catch (error) {
        return new NextResponse(error.message, { status: 500, headers: { 'Content-Type': 'application/json' } })

    }
}

//update a specific breed in the collection

export async function PATCH(req, { params }) {
    try {

        await dbConnect()
        const { breedId } = params;

        const data = await req.json()

        if (!breedId) {
            return new NextResponse("Invalid Request Payload", { status: 400 })
        }

        const myBreed = await Breed.findById(breedId)
       

        if (!myBreed) {
            return new NextResponse('No breed found', { status: 404 })
        }

        for (const key in data) {
            myBreed[key] = data[key]
        }

        const confirmedMyBreed = await myBreed.save()

        if (!confirmedMyBreed) {
            return new NextResponse('Failed to update breed', { status: 500 })
        }

        return new NextResponse(JSON.stringify(myBreed), { status: 200, headers: { 'Content-Type': 'application/json' } })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}