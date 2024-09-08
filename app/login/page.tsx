'use client'
import { FormEvent } from "react"
import CompForm from "../_components/CompForm"
import axios from "axios"
const Login = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);        
        
        const email = formData.get("email") as string;
        const pw = formData.get("password") as string;

        await axios.post("/api/RegisterUser", {email,pw});
        

    }
  return (
   <CompForm
   onSubmit={handleSubmit}
   textButton="Login"
   textDescription="Enter your login and password"   
   />
  )
}

export default Login