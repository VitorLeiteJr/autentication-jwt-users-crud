import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) =>{

        const body = await req.json();
        const {token} = body;
        
         try{
         
                await jwt.verify(token , process.env.SECRET_KEY as string);
                
                
        
                return NextResponse.json({status: true});               
            }catch(e){
                return NextResponse.json({Error: "invalided token", status: false});        
        }
    
}