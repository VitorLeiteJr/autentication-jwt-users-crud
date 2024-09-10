'use client'
import { FormEvent } from "react"
import CompForm from "../_components/CompForm"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
const Register = () => {

        const route = useRouter();
        
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);        
        
        const email = formData.get("email") as string;
        const pw = formData.get("password") as string;

        const response =await axios.post("/api/RegisterUser", {email,pw});

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
   />
  )
}

export default Register