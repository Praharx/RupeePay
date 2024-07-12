import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { signUpSchema,signUpType } from "@repo/zod_type/zod_type";

const jwtSecret = process.env.JWT_SECRET as string

export async function POST(req: NextRequest ){
   // getting the form params from forntend
   const {email, password, username}:signUpType =await req.json()

   //checking if data is in correct format/ empty inputs
   if(!signUpSchema.safeParse({email,password,username}).success){
      return NextResponse.json({msg:"Invalid inputs", success:false})
   }

   //check if user exists already
   const prevUser = await prisma.user.findFirst({
      where:{
         email
      }
   })
   
   if(prevUser){
      return NextResponse.json({msg:"User exists already",success:false})
   }
   //new user
   else{
      try{
         await prisma.user.create({
            data:{
               email,password,username
            }
         })
         //generate jwt and set the cookie
         const token = jwt.sign({email},jwtSecret)

         cookies().set("authToken",token)
         //send this token along with res
         return NextResponse.json({msg:"User registered successfully!",token,success:true})
         
      }catch(err){
         return NextResponse.json({msg:"Internal Server Error",success:false})
      }
   }
}
