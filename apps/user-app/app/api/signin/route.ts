import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@repo/db/prisma";
import { signInSchema,signInType } from "@repo/zod_type/zod_type";
const jwtSecret = process.env.JWT_SECRET as string;

export async function POST(req:NextRequest){
    const {username,password,email}:signInType = await req.json()
    //zod validate
    if(!signInSchema.safeParse({username,password,email}).success){
        return NextResponse.json({msg:"Invalid input data.Please check!"})
    }

    //check if user exists in db
    const user = await prisma.user.findFirst({
        where:{
           email
        }
    })

    if(!user){
        return NextResponse.json({msg:"Please signup first!",success:false})
    } else{
        try{
            if(user.password !== password){
                return NextResponse.json({msg:"Invalid user credentials",success:false})
            }else{
                const token = jwt.sign({email},jwtSecret);
                cookies().set("authToken",token)

                return NextResponse.json({msg:"User signed In!",success:true})
            }
        }catch(err){
            return NextResponse.json({msg:"Internal Server Error",success:false})
        }
    }
}