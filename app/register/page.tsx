'use client'
import { FormEvent } from "react"
import CompForm from "../_components/CompForm"
import axios from "axios"
const Register = () => {
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
   textButton="Register"
   textDescription="fill the fields"   
   />
  )
}

export default Register