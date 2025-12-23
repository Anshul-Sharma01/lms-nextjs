import { User } from "@/models/user.model";
import { connectDb } from "../mongoose";
import { getUserIdFromToken } from "./cookies";


export async function getCurrentUser(){
    const userId = await getUserIdFromToken();
    if(!userId) return null;

    await connectDb();

    const user = await User.findById(userId).select("-password");
    return user;
}



