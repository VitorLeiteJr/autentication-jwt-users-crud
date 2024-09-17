'use client'
import { FormEvent, useEffect } from "react"
import CompForm from "../_components/CompForm"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { checkIsLogin } from "@/util/checkIsLogin"
const Register = () => {

        const route = useRouter();

        useEffect(()=>{

        const token = localStorage.getItem("token") as string;
        const name = localStorage.getItem("name") as string; 

        const isLoginAsync = async ()=> {
        const isLogin = await checkIsLogin(token,name);
        
        if(!isLogin) return;
        route.push('/dashboard');
        }
        isLoginAsync();
        })
        
        

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);        
        
        const email = formData.get("email") as string;
        const pw = formData.get("password") as string;
        const name = formData.get("name") as string;

        const response =await axios.post("/api/RegisterUser", {email,pw,name});

        if(response.data.status){
       toast.success("Create with success!");
       route.push("/login")
        }else{
          toast.error("something is wrong!");
        }
        

    }
  return (
   <CompForm
   onSubmit={handleSubmit}
   textButton="Register"
   textDescription="fill the fields"  
   isLogin={false}
   isRegister={true}
   />
  )
}

export default Register