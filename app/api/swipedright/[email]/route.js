import dbConnect from "@/lib/mongodb"
import { SwipedRight } from "../../../../mongoose/schema/SwipedRight"
import {User} from "../../../../mongoose/schema/User"
import { NextResponse } from "next/server"


//update the document
export async function PATCH(req, {params}){
    try {
        await dbConnect()
        const {email} = params

        let data
        try {
            data = await req.json()
        } catch (error) {
            return new NextResponse('Invalid request payload', { status: 400 })
        }
        //to know if should be added or removed
        if (data.add === true){
            const add = await SwipedRight.findOneAndUpdate({ email }, { $push: { petId: data.petId } }, { returnDocument: "after", upsert: true })
            if (!add){
                return new NextResponse('Failed to add pet', { status: 500 })
            }
            return new NextResponse(JSON.stringify(add), { status:200, headers: { 'content-type': 'application/json'}})
        }
        else if (data.add === false){
            const myWishlist = await SwipedRight.find({email})
            if (!myWishlist){
                return new NextResponse('No wishlist found', { status: 404 })
            }
            const remove = await SwipedRight.findOneAndUpdate({email}, {$pull : {petId: data.petId}}, {returnDocument: "after", upsert: true})
            if (!remove){
                return new NextResponse('Failed to remove pet', { status: 500 })
            }
            return new NextResponse(JSON.stringify(remove), { status:200, headers: { 'content-type': 'application/json'}})
        }
        
    } catch (error) {
        return new NextResponse(error.message, {status:500})
        
    }
}

//get a specific document
export async function GET(req, {params}){
    try{
        await dbConnect()
        const {email} = params

        const user = await User.findOne({email})
        if (!user){
            return new NextResponse('No user found', { status: 404 })
        }
        const myWishlist = await SwipedRight.findOne({email})
        if (!myWishlist){
            return new NextResponse('No wishlist found', { status: 404 })
        }
        return new NextResponse(JSON.stringify(myWishlist), { status:200, headers: { 'content-type': 'application/json'}})
    }catch(error){

    }
}