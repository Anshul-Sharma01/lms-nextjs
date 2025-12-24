import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { User } from "@/models/user.model";
import { registerSchema } from "@/lib/validations/auth.validation";


type RouteParams = {
    resetToken : Promise < { resetToken : string } >;
}


export async function POST(req : NextRequest, { params } : RouteParams) : Promise < NextResponse >{
    try{

        const formdata = await req.formData();
        const password = formdata.get("password") as string;

        const { resetToken } = await params();
        const forgetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        const user = await User.findOne({
            forgetPasswordToken,
            forgetPasswordExpiry : {$gt : Date.now()}
        })

        if(!user){
            return NextResponse.json({
                success : false,
                error : "Reset Password Token not valid or expired"
            }, {
                status : 401
            })
        }

        const validationResult = registerSchema.pick({ password : true })
        .safeParse({
            password
        })
        if(!validationResult.success){
            return NextResponse.json({
                success : false,
                error : "Please follow the naming conventions for password"
            }, {
                status : 400
            })
        }

        user.password = password;
        user.forgetPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        return NextResponse.json({
            success : true,
            message : "Password Changed Successfully"
        }, {
            status : 200
        })


    }catch(err : any){
        console.error(err);
        return NextResponse.json({
            success : false,
            error : err.message
        }, {
            status : 400
        })
    }
}


