import mongoose, { Document, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export interface UserAttributes extends Document {
    name: string;
    email: string;
    password: string;
    role: "User" | "Tutor" | "Admin";
    avatar: {
        public_id: string;
        secure_url: string;
    };
    accountStatus: "Active" | "Suspended";
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpiry?: string;
}

export interface UserMethods {
    generateAccessToken(): string;
    generateRefreshToken(): string;
    isPasswordCorrect(password: string): Promise<boolean>;
}

export type UserDocument = mongoose.HydratedDocument<UserAttributes, UserMethods>;



const userSchema = new Schema<UserAttributes, {}, UserMethods>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, "Email already exists in the database !!"],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["User", "Tutor", "Admin"],
            default: "User",
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        accountStatus: {
            type: String,
            enum: ["Active", "Suspended"],
            default: "Active",
        },
        refreshToken: {
            type: String,
            select: false,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpiry: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);



userSchema.pre("save", async function (this: UserDocument) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});



// Access Token
userSchema.methods.generateAccessToken = function () {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiry = process.env.ACCESS_TOKEN_EXPIRY;

    if (!secret) throw new Error("ACCESS_TOKEN_SECRET is missing!");
    if (!expiry) throw new Error("ACCESS_TOKEN_EXPIRY is missing!");

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        secret,
        { expiresIn: expiry }
    );
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiry = process.env.REFRESH_TOKEN_EXPIRY;

    if (!secret) throw new Error("REFRESH_TOKEN_SECRET is missing!");
    if (!expiry) throw new Error("REFRESH_TOKEN_EXPIRY is missing!");

    return jwt.sign(
        { _id: this._id },
        secret,
        { expiresIn: expiry }
    );
};

// Compare Password
userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


export const User =
    models.User ||
    model<UserAttributes, mongoose.Model<UserAttributes, {}, UserMethods>>(
        "User",
        userSchema
    );
