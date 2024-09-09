import { Adoption } from "@/mongoose/schema/Adoption";
import { User } from "@/mongoose/schema/User";
import { Pet } from "@/mongoose/schema/Pet";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

//get a specific adoption document
export async function GET(req, {params}){
    try {
        await dbConnect()
        const {adoptionId} = params
        const adoption = await Adoption.findById(adoptionId)
        
        if(!adoption){
            return new NextResponse("No Adoption found", {status: 500})
        }

        return new NextResponse(JSON.stringify(adoption), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}

//update a specific adoption document
export async function PATCH(req, {params}){
    try{
        await dbConnect()
        const {adoptionId} = params

        const myAdoption = await Adoption.findById(adoptionId)

        if (!myAdoption){
            return new NextResponse("No Adoption found", {status: 404})
        }

        const data = await req.json()
        if (!data){
            return new NextResponse("Invalid request payload", {status: 400})
        }

        const user = await  User.findById(data["adopterId"])
        if (!user){
            return new NextResponse("No User found", {status: 404})
        }
       //console.log(user)

        const pet = await Pet.findById(data["petId"])
        if (!pet){
            return new NextResponse("No Pet found", {status: 404})
        }

        Object.assign(myAdoption, data)
        const updatedAdoption = await myAdoption.save()
        return new NextResponse(JSON.stringify(updatedAdoption), {status:200, headers: {"content-type": "application/json"}})

    }catch(error){
        return new NextResponse(error.message, {status: 500})

    }
}

//delete a specific adoption profile
export async function DELETE(req, {params}){
    try {
        await dbConnect()
        const {adoptionId} = params

        const deleteAdoption = await Adoption.findByIdAndDelete(adoptionId)

        if (!deleteAdoption) {
            return new NextResponse("Failed to delete", {status: 500})
        }

        return new NextResponse(JSON.stringify(deleteAdoption), {status:200})
    } catch (error) {
        return new NextResponse(error.message, {status:500})
        
    }
}