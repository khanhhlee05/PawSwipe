import { Review } from "@/mongoose/schema/Review";
import { NextResponse } from "next/server";



//Delete a review based on a review Id
export async function DELETE(req, {params}){
    try {
        const {Id} = params
        const deleteReview = await Review.findByIdAndDelete(Id)

        if (!deleteReview){
            return new NextResponse('Review not found', { status: 404 })
        }

        return new NextResponse(JSON.stringify(deleteReview), { status: 200 })
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

//Fetch a shelter review based on a shelterId

export async function GET(req, {params}){
    try {
        const {Id} = params
        const shelterReview = await Review.find({shelter: Id})

        if (!shelterReview){
            return new NextResponse('No review found for this shelter', { status: 404 })
        }

        return new NextResponse(JSON.stringify(shelterReview), { status: 200 })
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}