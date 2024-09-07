import { prisma } from "@/util/prisma";
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
   
    const body = await req.json();
    const {email,password} = body;

    try 

     {
                    await prisma.user.createMany({
                data: {
                    email: email,
                    password: password
                }
            }) 
            return true;
    }catch(e){
        return false;
    }   
}