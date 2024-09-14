import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
   
    const body = await req.json();
    const {email,pw, name}  = body;

    console.log(email,pw,name);
    const salt = await bcrypt.genSalt(10);    
    const hashPassword = await bcrypt.hash(pw, salt);

    try 
     {
            await prisma.user.createMany({
                data: {
                    email: email,
                    password: hashPassword,
                    name: name
                }
            }) 
            return NextResponse.json({Error: "Account created with success", status: true});
            }
            catch(e){
                return NextResponse.json({Error: "something is wrong", status: false});
            }   
}