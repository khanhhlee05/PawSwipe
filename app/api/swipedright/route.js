import dbConnect from "@/lib/mongodb"
import { SwipedRight } from "../../../mongoose/schema/SwipedRight"
import {User} from "../../../mongoose/schema/User"
import { NextResponse } from "next/server"

//get every document in the collection
export async function GET(req){
    try{
        await dbConnect()

        const swipedRight = await SwipedRight.find()
        if (!swipedRight) {
            return new NextResponse("No SwipedRight found", {status: 404})
        }

        return new NextResponse(JSON.stringify(swipedRight), {status: 200, headers : {
            "content-type": "application/json"
        }})
    }catch(error){

        return new NextResponse(error, {status: 500})
    }
}

//create a new document
export async function POST(req){
    try {
        await dbConnect()
       
        const data = await req.json()

        if (!data){
            return new NextResponse("Invalid JSON input", {status: 400})
        }

        const user = await User.findOne({email: data.email})

        if (!user) {
            return new NextResponse("User not found", {status: 404})
        }

        const swipedProfile = new SwipedRight(data)

        const saved = await swipedProfile.save()
        if(!saved){
            return new NextResponse("Failed to save SwipedRight", {status: 500})
        }

        return new NextResponse(JSON.stringify(saved), {status: 201, headers: {
            "content-type": "application/json"
        }})
        
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}
