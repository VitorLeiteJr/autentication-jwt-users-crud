'use client'
import { useEffect } from "react"
import Dashboard from "../_components/Dashboard"
import { useRouter } from "next/navigation"
import { CheckTokenByKey, CheckTokenValidationTime } from "@/util/jwt/checkToken"


const DashboardPage =  () => {

    //const nickName= cookies().get("nickname");
     
      const route = useRouter();

     useEffect(()=>{
      
      const token = localStorage.getItem("token") as string;
      
      console.log(CheckTokenByKey(token));
      if(!CheckTokenByKey(token)) route.push('/login');
     
        });

  return (
    <Dashboard
    nickName="Vitor Leite"
    />
  )
}

export default DashboardPage