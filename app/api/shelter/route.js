import { Shelter } from "@/mongoose/schema/Shelter";
import { User } from "@/mongoose/schema/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";




//get list of all shelters
export async function GET(req) {
    try {
        await dbConnect()

        const shelters = await Shelter.find();
        return new NextResponse(JSON.stringify(shelters));

    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

//create a new shelter document
export async function POST(req){
    try {
        await dbConnect()

        const data = await req.json()
        if (!data){
            return new NextResponse("Invalid Request Payload", {status: 500}) 
         }

         const newShelter = new Shelter(data)
         const confirmedShelter = await newShelter.save()

         const shelterOwnerId = data["staffId"]

         const shelterOwner = await User.findById(shelterOwnerId)

         if (!shelterOwner){
            return new NextResponse("Shelter Owner not found", {status: 500})
         }

         if (!confirmedShelter){
            return new NextResponse("Cannot create a new Shelter", {status: 500})
         }

         return new NextResponse(JSON.stringify(confirmedShelter), {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}