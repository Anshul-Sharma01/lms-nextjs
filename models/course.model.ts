import mongoose, { Schema, Model, Document, Types, model, models  } from "mongoose";



export interface CourseInterface extends Document{
    title : string;
    slug : string;
    description : string;
    modules : Types.ObjectId[];
    tutor : Types.ObjectId;
}

const courseSchema = new Schema < CourseInterface > ({
    title : {
        type : String,
        required : [true, "Course title not provided"]
    },
    slug : {
        type : String,
        required : [true, "Slug not provided !!"],
        unique : true  // Slug should be unique for SEO-friendly URLs
    },
    description : {
        type : String,
        required : [true, "Course Description not provided"]
    },
    modules : [
        {
            type : Schema.Types.ObjectId,
            ref : "Module"
        }
    ],
    tutor : {
        type : Schema.Types.ObjectId,
        ref : "User"  // Reference to User model (tutors are users with role "Tutor")
    }
}, {
    timestamps : true
})

export const Course : Model < CourseInterface > = 
    models.Course || 
    model < CourseInterface > ("Course", courseSchema);







