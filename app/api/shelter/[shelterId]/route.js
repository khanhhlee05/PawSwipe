import { User } from "@/mongoose/schema/User";
import { Shelter } from "@/mongoose/schema/Shelter";
import { NextResponse } from "next/server";


//fetch a specific shelter
export async function GET(req, {params}){
    const {shelterId} = params
    
}