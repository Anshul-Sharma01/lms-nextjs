import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { registerSchema } from "@/lib/validations/auth.validation";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/utils/cookies";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        const avatarFile = formData.get("avatar") as File;

        const validationResult = registerSchema.safeParse({
            name,
            email,
            password,
            role: role || "User",
            avatar: avatarFile,
        });

        if (!validationResult.success) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                errors: validationResult.error.issues.map((err) => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            }, {
                status: 400
            });
        }

        const validatedData = validationResult.data;

        await connectDb();

        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            console.log("existingUser : ", existingUser);
            return NextResponse.json({
                success: false,
                error: "User with this email already exists"
            }, {
                status: 400
            });
        }

        let avatarData;
        try {
            avatarData = await uploadToCloudinary(validatedData.avatar, "lms/avatars");
        } catch (uploadError: any) {
            return NextResponse.json(
                { success: false, error: `Avatar upload failed: ${uploadError.message}` },
                { status: 500 }
            );
        }

        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
            role: validatedData.role,
            avatar: {
                public_id: avatarData.public_id,
                secure_url: avatarData.secure_url,
            },
        });

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
            status: 201
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({
            success: false,
            error: err.message
        }, {
            status: 500
        });
    }
}