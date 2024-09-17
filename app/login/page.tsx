'use client'
import { FormEvent, useEffect } from "react"
import CompForm from "../_components/CompForm"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { checkIsLogin } from "@/util/checkIsLogin"

const Login = () => {
    
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

        const response = await axios.post("/api/LoginUser", {email,pw});

        if(response.data.status){
          toast.success("Autentication is ok")
          localStorage.setItem("token", response.data.dataToken.token);
          localStorage.setItem("name", response.data.dataToken.name);
          route.push("/dashboard");
        }else{
        toast.error("something is wrong");
        }

      
    }
  return (
   <CompForm
   onSubmit={handleSubmit}
   textButton="Sign in"
   textDescription="Enter your login and password" 
   isLogin={true}
   isRegister={false}
   />
  )
}

export default Login