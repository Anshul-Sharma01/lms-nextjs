import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

type MongooseCache = {
    conn : typeof mongoose | null;
    promise : Promise < typeof mongoose > | null
}
const globalWithMongoose = global as typeof globalThis & { _mongoose : MongooseCache };

const cached = globalWithMongoose._mongoose || (globalWithMongoose._mongoose = { conn : null, promise : null });

export async function connectDb(){
    if(cached.conn) return cached.conn;
    if(!MONGODB_URI){
        throw new Error("Please set MONGODB_URI in .env");
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName : process.env.MONGO_DBNAME,
            bufferCommands : false,
        })
        .then((m) => m );
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

















