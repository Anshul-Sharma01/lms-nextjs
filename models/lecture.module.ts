import mongoose, { Schema, Document, Types, Model, model, models } from "mongoose";



export interface LectureInterface extends Document{
    title : string;
    tooltip? : string;
    moduleId : Types.ObjectId;
    video : {
        public_id : string;  
        secure_url : string;
    }
}


const lectureSchema = new Schema < LectureInterface > ({
    title : {
        type : String,
        required : [true, "Lecture title not provided"]
    },
    tooltip : {
        type : String
    },
    moduleId : {
        type : Schema.Types.ObjectId,
        ref : "Module"
    },
    video : {
        public_id : {
            type : String,
            required : true
        },
        secure_url : {
            type : String,
            required : true
        }
    }
},{
    timestamps : true
})

export const Lecture : Model < LectureInterface > = 
    models.Lecture || 
    model < LectureInterface > ("Lecture", lectureSchema);





