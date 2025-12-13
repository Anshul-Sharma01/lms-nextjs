import mongoose, { Schema, Document, Model, Types, model, models } from "mongoose";


export interface ModuleInterface extends Document{
    title : string;
    summary : string;
    courseId : Types.ObjectId;  
    lectures : Types.ObjectId[];  
}


const moduleSchema = new Schema < ModuleInterface >({
    title : {
        type : String,
        required : [true, "Module title not provided "]
    },
    summary : {
        type : String,
        required : [true, "Module Summary not provided"]
    },
    courseId : {
        type : Schema.Types.ObjectId,
        ref : "Course",
        required : true  
    },
    lectures : [
        {
            type : Schema.Types.ObjectId,
            ref : "Lecture"
        }
    ]
}, {
    timestamps : true
});


export const Module : Model < ModuleInterface > = 
    models.Module || 
    model < ModuleInterface >("Module", moduleSchema);







