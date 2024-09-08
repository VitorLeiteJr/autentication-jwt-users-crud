import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
   
    const body = await req.json();
    const {email,pw} = body;

    console.log(email,pw);
    const salt = await bcrypt.genSalt(10);    
    const hashPassword = await bcrypt.hash(pw, salt);

    try 
     {
            await prisma.user.createMany({
                data: {
                    email: email,
                    password: hashPassword
                }
            }) 
            return NextResponse.json({message: true});
    }catch(e){
        return NextResponse.json({message: false});
    }   
}