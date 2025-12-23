"use server"

import { User } from "@/models/user.model";
import { connectDb } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/utils/auth";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/utils/cloudinary";
import { registerSchema } from "@/lib/validations/auth.validation";

export const updateUserProfile = async (formData: FormData) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized Request");
    
        const name = formData.get("name");
    
        const validationResult = registerSchema.pick({ name: true }).safeParse({
            name,
        });
    
        if (!validationResult.success) {
            throw new Error("Invalid name");
        }
    
        await connectDb();
    
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { name: validationResult.data.name },
            {
                new: true,
                runValidators: true,
                select: "-password",
            }
        );
    
        return { 
            success: true,
            user: JSON.parse(JSON.stringify(updatedUser)),
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message,
        };
    }
  };
  
  export const updateUserAvatar = async (formData: FormData) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized request");
    
        const avatar = formData.get("avatar");
    
        const validationResult = registerSchema
            .pick({ avatar: true })
            .safeParse({ avatar });
    
        if (!validationResult.success) {
            throw new Error(
            validationResult.error.errors[0]?.message || "Invalid avatar"
            );
        }
    
        await connectDb();
    
        const avatarData = await uploadToCloudinary(
            validationResult.data.avatar,
            "lms/avatars"
        );
    
        if (user.avatar?.public_id) {
            await deleteFromCloudinary(user.avatar.public_id);
        }
    
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                avatar: {
                    public_id: avatarData.public_id,
                    secure_url: avatarData.secure_url,
                },
            },
            {
                new: true,
                select: "-password",
            }
        );
    
        if (!updatedUser) throw new Error("User not found");
    
        return {
            success: true,
            user: JSON.parse(JSON.stringify(updatedUser)),
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message,
        };
    }
  };
  





