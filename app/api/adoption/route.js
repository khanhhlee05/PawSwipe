import { Adoption } from "@/mongoose/schema/Adoption";
import { Pet } from "@/mongoose/schema/Pet";
import { User } from "@/mongoose/schema/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

//Get a list of adoptions in the databse
export async function GET(req) {
    try {
        await dbConnect()
        const adoption = await Adoption.find()

        if (!adoption) {
            return new NextResponse("Cannot fetch adoptions", { status: 500 })
        }

        return new NextResponse(JSON.stringify(adoption), { status: 200, headers: { 'Content-Type': 'application/json' } })
    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}

//Create a new adoption in the database using transaction for atomicity //TODO: check this API
export async function POST(req) {
    let session

    try {
        await dbConnect()

        const data = await req.json()
        session = await mongoose.startSession()
        session.startTransaction()
        

        const myUser = await User.findById(data["adopterId"]).session(session)
        const myPet = await Pet.findById(data["petId"]).session(session)

        if (!myUser ||!myPet) {
            await session.abortTransaction()
            session.endSession()
            return new NextResponse("Invalid user or pet ID", { status: 400 })
        }

        const newAdoption = new Adoption(data)
        const confirmedAdoption = await newAdoption.save({session})

        myPet["adoptStatus"] = true
        const adoptedPet = await myPet.save({ session })

        await session.commitTransaction()
        session.endSession()

        return new NextResponse(JSON.stringify(confirmedAdoption), { status:200})
              



    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return new NextResponse(error.message, { status: 500 })
    }
}