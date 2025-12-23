import { connectDb } from "@/lib/mongoose";
import { getRefreshTokenFromCookie, setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/utils/cookies";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";


export async function GET(){
    try{

        const token = await getRefreshTokenFromCookie();
        if(!token){
            return NextResponse.json({
                success : false,
                error : "Invalid or Expired Refresh Token"
            }, {
                status : 401
            })
        }

        await connectDb();
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("+refreshToken");

        if(!user){
            return NextResponse.json({
                success : false,
                error : "No user found "
            }, {
                status : 401
            })
        }

        if(token != user?.refreshToken){
            return NextResponse.json({
                success : false,
                error : "Unauthorized refresh Token"
            }, {
                status : 401
            })
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        await setAccessTokenCookie(accessToken);
        await setRefreshTokenCookie(refreshToken);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave : false });

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.refreshToken;

        return NextResponse.json({
            success : true,
            data : userObj
        },{
            status : 200
        })


    }catch(err : any){
        console.error("An Error Occurred : ", err);
        return NextResponse.json({
            success : false,
            error : err.message
        }, {
            status : 500
        })
    }
}




