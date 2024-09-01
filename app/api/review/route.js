import { Review } from "@/mongoose/schema/Review";
import { User } from "@/mongoose/schema/User";
import { Shelter } from "@/mongoose/schema/Shelter";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

//get list of reviews from collection 
export async function GET(req){
    try{
        await dbConnect()
        const reviews = await Review.find()

        if (!reviews){
            return new NextResponse('Cannot fetch review', { status: 404 });
        }

        return new NextResponse(JSON.stringify(reviews), { status: 200})

    }catch(error){
        return new NextResponse('Cannot fetch review', { status:404});
    }
}

//create a new review

export async function POST(req){
    try {
        await dbConnect()
        const data = await req.json()

        if (!data){
            return new NextResponse("Invalid Request Payloaday ", { status: 404 })
        }

        
        
            const myShelter = await Shelter.findById(data["shelter"])
            if (!myShelter) {
                return new NextResponse ("Invalid ShelterId", { status: 404 })
            }

        const newReview = new Review(data)
        const savedReview = await newReview.save()

        if (!savedReview){
            return new NextResponse("Cannot create new review ", {status: 500})
        }
        return new NextResponse(JSON.stringify(savedReview), { status:200, headers : {"Content-Type" : "application/json"}})
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}   