import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Breed } from "@/mongoose/schema/Breed";

//get a list of breed documents from the breed collection
export async function GET(req) {
    try {
        await dbConnect()

        const breeds = await Breed.find()

        if (!breeds){
            return new NextResponse('No breeds found', { status: 404 })
        } 

        return new NextResponse(JSON.stringify(breeds), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        return new NextResponse(error.message, { status:500})
    }
}

//add a new breed document to the breed collection
export async function POST(req) {
    try{

        await dbConnect()

        let data;
        try {
            data = await req.json();
        } catch (error) {
            return new NextResponse('Invalid JSON input', { status: 400 });
        }
        
        if (!data){
            return new NextResponse('Invalid request payload', { status: 400 });
        }

        const newBreed = Breed(data)
        const confirmedNewBreed = await newBreed.save()

        if (!confirmedNewBreed){
            return new NextResponse('Failed to save breed', { status: 500, headers: { 'Content-Type': 'application/json'}});
        }

        return new NextResponse (JSON.stringify(confirmedNewBreed), {status : 200})
    }catch(error){
        return new NextResponse(error.message, { status: 500, headers: { 'Content-Type': 'application/json'}});

    }
}
