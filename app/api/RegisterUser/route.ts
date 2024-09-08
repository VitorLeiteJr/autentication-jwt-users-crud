import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
   
    const body = await req.json();
    const {email,pw} = body;

    console.log(email,pw);

    try 
     {
            await prisma.user.createMany({
                data: {
                    email: email,
                    password: pw
                }
            }) 
            return NextResponse.json({message: true});
    }catch(e){
        return NextResponse.json({message: false});
    }   
}