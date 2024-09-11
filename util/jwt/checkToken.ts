import jwt, { JwtPayload } from "jsonwebtoken";


//------THIS PATH WAS INVALIDATE, BECAUSE THE FUNCTION VERIFY-------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckTokenValidation = (token: string): JwtPayload | any=>{


    const checkToken = jwt.decode(token) as JwtPayload;  

    if(!checkToken) return false;

    return checkToken;

}

export const CheckTokenValidationTime = (token: string) => {

    const  isOk = CheckTokenValidation(token);

    if(!isOk) return false;

    const currentTime= Date.now()/1000;// get time in seconds
    return isOk.exp ? isOk.exp > currentTime : false;

}
