import { sendEmail } from "@/lib/utils/sendEmail";
import { registerSchema } from "@/lib/validations/auth.validation";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { emailTemplate } from "@/lib/constants";

export async function POST(req : NextRequest){
    try{
        const formData = await req.formData();
        const email = formData.get("email") as string;

        const validationResult = registerSchema.pick({ email : true })
        .safeParse({
            email
        })
        if(!validationResult.success){
            return NextResponse.json({
                success : false,
                error : "Please provide a valid email"
            }, {
                status : 400
            })
        }

        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({ 
                success : false,
                error : "No User with this email exists !!"
            }, {
                status : 404
            })
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        const mailSubject = "Forgot Password Token"
        const html = emailTemplate.replace("{{RESET_TOKEN}}", `${process.env.FRONTEND_URL}/api/auth/reset-password/${hashedToken}`);
        await sendEmail({ to : email, subject : mailSubject, html } );

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = 15 * 60 * 1000;

        await user.save({ validateBeforeSave : false });

        return NextResponse.json({
            success : true,
            message : "The Forgot Password Token is successfully sent to your mail"
        }, {
            status : 200
        })

    }catch(err : any){
        return NextResponse.json({
            success : false,
            error : err.message
        }, {
            status : 500
        })
    }
}




