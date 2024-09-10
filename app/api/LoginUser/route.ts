import { NextRequest, NextResponse } from "next/server"
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import { prisma } from "@/util/prisma";

export const POST =  async(req: NextRequest) => {

    const body= await req.json();
    const {email,pw} = body;

    console.log(email,pw)
    const getUser= await prisma.user.findUnique({ 
        where: {
            email: email
        }       
         });

         if(!getUser){
            return NextResponse.json({Error: "user not found or something is wrong", status: false});
         }

         const user = await bcrypt.compare(pw, getUser?.password);    

         if(!user){
            return NextResponse.json({Error: "password dont match!",status: false})
         }   
         
         const token = jwt.sign({id: getUser.id, email: getUser.email},
            process.env.SECRET_KEY as string, { expiresIn: 60}
         );

         const dataToken = {
            username: getUser.name,
            token: token
            };

         return NextResponse.json({dataToken: dataToken, status: true});

        }