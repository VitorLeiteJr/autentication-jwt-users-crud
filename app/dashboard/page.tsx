'use client'
import { useEffect, useState } from "react"
import Dashboard from "../_components/Dashboard"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import { User } from "@prisma/client"
import { checkIsLogin } from "@/util/checkIsLogin"



const DashboardPage =  () => {

    //const nickName= cookies().get("nickname");
      const [users,setUsers] = useState<User[]>([]);
      const [name, setName] = useState("");
      const route = useRouter();
      

     useEffect(()=>{
      
      const token = localStorage.getItem("token") as string;
      const name = localStorage.getItem("name") as string;
      setName(name);      

              
      const isLoginAsync = async ()=> {
        const isLogin = await checkIsLogin(token,name);
        
        if(!isLogin) {
        toast.error("Something is wrong");
        route.push("/login");
        }else{
          users_get();
        }        
        }
      

         const users_get = async () =>{
          const users = await axios.post("/api/GetUser", {token});          
          setUsers(users.data.users);
         }      
         isLoginAsync();
        
        },[route]);

        const handleDelete = async (id: string) =>{
          const token =localStorage.getItem("token") as string;

          const isOk = confirm("Are you sure?");

          if(!isOk) return;

         const deleteUser= await axios.post("/api/DeleteUser",{id,token})

          if(!deleteUser.data.status) toast.error("dont is possible complite this operation");

          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          toast.success("make with success!");


        }

  return (
      
    <Dashboard
    users={users}
    nameUserSession={name}
    handleDelete={handleDelete}
    />
  )
}

export default DashboardPage