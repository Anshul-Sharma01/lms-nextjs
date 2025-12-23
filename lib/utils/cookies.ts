import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

const accessTokenOptions = {
    httpOnly : true,
    secure : process.env.NODE_ENV === "production",
    sameSite : "lax" as const,
    maxAge : 60 * 15, //15 minutes
    path : "/"
}

const refreshTokenOptions = {
    httpOnly : true,
    secure : process.env.NODE_ENV === "production",
    sameSite : "lax" as const,
    maxAge : 60 * 60 * 24 * 7, // 7 days
    path : "/"
}


type jwtPayload = {
    _id : string,
    email : string,
    name : string
}   



export async function setAccessTokenCookie(token : string){
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, accessTokenOptions);
}

export async function setRefreshTokenCookie(token : string){
    const cookieStore = await cookies();
    cookieStore.set("refreshToken", token, refreshTokenOptions);
}

export async function getAccessTokenFromCookie() : Promise < string | null > {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");
    return token?.value || null;
}


export async function getRefreshTokenFromCookie() : Promise < string | null > {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken");
    return token?.value || null;
}

export async function clearAuthCookies(){
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}



export async function getUserIdFromToken() : Promise < string | null >{
    const token = await getAccessTokenFromCookie();
    if(!token){
        return null;
    }
    
    try{
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwtPayload;
        return payload._id;
    }catch(err){
        return null;
    }

}





