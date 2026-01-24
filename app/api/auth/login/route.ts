import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/utils/cookies";


export async function POST(req: NextRequest) {
    try {

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
            }, {
                status: 400
            })
        }

        await connectDb();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "This email does not exists in the database"
            }, {
                status: 400
            });
        }

        const isPassValid = await user.isPasswordCorrect(password);
        if (!isPassValid) {
            return NextResponse.json({
                success: false,
                error: "Password is not valid "
            }, {
                status: 400
            })
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        await setAccessTokenCookie(accessToken);
        await setRefreshTokenCookie(refreshToken);

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.refreshToken;

        return NextResponse.json({
            success: true,
            data: userObj
        }, {
            status: 200
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({
            success: false,
            error: err.message
        }, {
            status: 500
        })
    }
}



