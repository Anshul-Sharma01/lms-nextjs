import { connectDb } from "@/lib/mongoose";
import { clearAuthCookies, getRefreshTokenFromCookie } from "@/lib/utils/cookies";
import { NextResponse } from "next/server"
import { jwt } from "jsonwebtoken";
import { User } from "@/models/user.model";


export async function GET(){
    try{
        await connectDb();

        const refreshToken = await getRefreshTokenFromCookie();
        if(refreshToken){
            try{
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET!
                )
                await User.findByIdAndUpdate(decoded._id, {
                    $unset: { refreshToken: "" },
                });

            }catch(err : any){
                return NextResponse.json({
                    success : false,
                    error : "Invalid Auth tokens !!"
                })
            }
        }


        await clearAuthCookies();
        return NextResponse.json(
            {
                success: true,
                message: "Logged out successfully",
            },
            { status: 200 }
        );




    }catch(err : any){
        console.error(err);
        return NextResponse.json({
            success: false,
            error: err.message
        }, {
            status: 500
        });
    }
}






