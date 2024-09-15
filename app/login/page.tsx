'use client'
import { FormEvent, useEffect } from "react"
import CompForm from "../_components/CompForm"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const Login = () => {
    
  const route = useRouter();

  useEffect(()=>{
    checkToken();
  })


  const checkToken = async ()=>{
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
      
    if(token===null || name===null ) return;

    const response = await axios.post("/api/CheckToken", {token});
    
    console.log(response.data.status);

    if(!response.data.status) return;

    route.push('/dashboard');

    //console.log(token);

    }

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