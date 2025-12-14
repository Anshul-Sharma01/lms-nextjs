import { cookies } from "next/headers"

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






