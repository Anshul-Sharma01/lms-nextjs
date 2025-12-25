import { NextResponse } from "next/server";
import { getCurrentUser } from "../utils/auth"

export function withAuth(handler : Function){
    return async function(){
        const user = await getCurrentUser();

        if(!user){
            return NextResponse.json({
                success : false,
                error : "Unauthorized"
            }, {
                status : 401
            });
        }

        return handler(user);
    }
}


