'use client'
import { useEffect, useState } from "react"
import Dashboard from "../_components/Dashboard"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import { User } from "@prisma/client"



const DashboardPage =  () => {

    //const nickName= cookies().get("nickname");
      const [users,setUsers] = useState<User[]>([]);
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

         const users = async () =>{
          const users = await axios.post("/api/GetUser", {token});
          
          setUsers(users.data.users);
         }      
        validate();
        users();
        },[]);

  return (
      
    <Dashboard
    users={users}
    />
  )
}

export default DashboardPage