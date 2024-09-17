import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/util/prisma";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) =>{

    const body = await req.json();
    const {token,id} = body;

    console.log(token,' id: ',id)

    const jwtCheck = jwt.verify(token,process.env.SECRET_KEY as string);

    if(!jwtCheck) return NextResponse.json({Error: "dont autenticate", status: false});

    const deleteUser = await prisma.user.delete({
        where: {
            id: id
        }
    });

    if(!deleteUser) return NextResponse.json({Error: "user not found", status: false});

    revalidatePath('/dashboard');
    return NextResponse.json({status:true});
    


}