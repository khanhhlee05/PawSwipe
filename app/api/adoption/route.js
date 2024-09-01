import { Adoption } from "@/mongoose/schema/Adoption";
import { Pet } from "@/mongoose/schema/Pet";
import { User } from "@/mongoose/schema/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "@/mongoose";


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

//Create a new adoption in the database using transaction for atomicity
export async function POST(req) {


    try {
        await dbConnect()
        const session = await mongoose.startSession()
        session.startTransaction()

        const myUser = await User.findById



    } catch (error) {
        return new NextResponse(error.message, { status: 500 })
    }
}