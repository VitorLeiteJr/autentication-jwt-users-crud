import axios from "axios";


export const checkIsLogin = async (token: string,name:string)=>{
    
      
    if(token===null || name===null ) return false;

    const response = await axios.post("/api/CheckToken", {token});

    if(!response.data.status) return false;


    return true;
    }