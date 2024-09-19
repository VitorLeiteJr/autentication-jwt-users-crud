"use client"
import React, { FormEvent, useEffect } from 'react'
import CompForm from '../_components/CompForm'
import { checkIsLogin } from '@/util/checkIsLogin'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const CreateUser = () => {
    const router = useRouter();

    useEffect(()=>{
        const handleUser = async ()=>{        
            const token = localStorage.getItem("token") as string;
            const name = localStorage.getItem("name") as string;

            const checkValidToken= await checkIsLogin(token,name);

            if(!checkValidToken) {
                router.push('/login'); 
                return;
            }
        }
        handleUser();
    },[router])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const pw = formData.get("password") as string;      

        const register = await axios.post("/api/RegisterUser",{email,name,pw});

        if(!register) toast.error("try again ;(");

        toast.success("The user was created with success!");
        router.push("/dashboard");

    }

  return (
    <CompForm
   onSubmit={handleSubmit}
   textButton="Create"
   textDescription="fill the fields to create a new user" 
   isLogin={false}
   isRegister={true}
   isEditUser={false}
   />
  )
}

export default CreateUser