import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/util/prisma";

export const POST = async (req: NextRequest) => {

    const body = await req.json();
    const {token} = body;

    const checkToken = jwt.verify(token, process.env.SECRET_KEY as string);

    if(!checkToken) return NextResponse.json({Error: "Dont autenticate", status: false})

    const users = await prisma.user.findMany();
    
    return NextResponse.json({users}); 



}