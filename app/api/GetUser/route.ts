import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/util/prisma";

export const POST = async (req: NextRequest) => {

    const body = await req.json();
    const {token,id} = body;
    let users;


    const checkToken = jwt.verify(token, process.env.SECRET_KEY as string);


    if(!checkToken) return NextResponse.json({Error: "Dont autenticate", status: false})

    if(id===undefined) users = await prisma.user.findMany();
    if(id!==undefined) users = await prisma.user.findUnique({
        where: {id:id}
    });
    return NextResponse.json({users}); 



}