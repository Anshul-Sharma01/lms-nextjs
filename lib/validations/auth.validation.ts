import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters")
        .trim(),
    
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    
    role: z
        .enum(["User", "Tutor", "Admin"], {
            message: "Role must be User, Tutor, or Admin"
        })
        .optional()
        .default("User"),
    
    avatar: z
        .instanceof(File, { message: "Avatar image is required" })
        .refine((file) => file.size > 0, "Avatar file cannot be empty")
        .refine((file) => file.size <= 5 * 1024 * 1024, "Avatar must be less than 5MB")
        .refine(
            (file) => ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type),
            "Avatar must be a JPEG, PNG, or WebP image"
        ),

  
});

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    
    password: z
        .string()
        .min(1, "Password is required"),
});



export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;