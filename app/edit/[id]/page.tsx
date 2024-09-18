'use client'
import CompForm from '@/app/_components/CompForm';
import { checkIsLogin } from '@/util/checkIsLogin';
import axios from 'axios';
import { notFound, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface editProps{
    params: {
        id: string;
    }
}

type user = {
    email: string,
    name: string,
}

const EditUser = ({params: {id}}: editProps) => {

        const [user, setUser] = useState<user>();
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

            const getUser = await axios.post('/api/GetUser',{token,id});
                        
            if(!getUser) return notFound();
            setUser(getUser.data.users);
            return getUser;
        }
       handleUser();
    },[id, router])

    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const token= formData.get("token") as string;

        const editUser = await axios.post('/api/EditUser',{token,id,email,name});

        if(!editUser.data.status)toast.error("something is wrong");
        
        
        toast.success("user was edited with success");
        router.push('/dashboard')
        


    }

  return (
    <CompForm
    onSubmit={handleSubmit}
    textButton='Edit user'
    textDescription='fill the fields to edit'
    isLogin={false}
    isRegister={false}
    isEditUser={true}
    emailValue={user?.email}
    nameValue={user?.name}
    />
  )
}

export default EditUser