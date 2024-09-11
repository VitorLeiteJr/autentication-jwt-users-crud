'use client'
import { useEffect } from "react"
import Dashboard from "../_components/Dashboard"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"


const DashboardPage =  () => {

    //const nickName= cookies().get("nickname");
     
      const route = useRouter();

     useEffect(()=>{
      
      const token = localStorage.getItem("token") as string;
      
      const validate = async () =>{
        
      const isOk = await axios.post("/api/CheckToken",{token});

      if(!isOk.data.status) {
        toast.error(isOk.data.Error);
         route.push("/login");
                      }
    
                         }
        validate();
        });

  return (
    <Dashboard
    nickName="Vitor Leite"
    />
  )
}

export default DashboardPage