import { prisma } from "@/util/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) =>{

const body = await req.json();
const {token,id,email,name} = body;

const checkToken= jwt.verify(token, process.env.SECRET_KEY as string);

if(!checkToken) return NextResponse.json({Error: "invalid token", status: false});

const editUser = await prisma.user.update({
    data:{
        name: name,
        email: email,
    },
    where: {
        id: id
    }
    
});

if(!editUser) return NextResponse.json({Error: "user invalid id", status: false});

return NextResponse.json({status: true});


}