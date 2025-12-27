import { withAuth } from "@/lib/middlewares/withAuth";
import { connectDb } from "@/lib/mongoose";
import { courseCreationSchema } from "@/lib/validations/course.validation";
import { NextRequest, NextResponse } from "next/server";



export const POST = withAuth(async(req : NextRequest, user) => {
    try{
        const formData = await req.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const category = formData.get("category");

        const validationResult = courseCreationSchema.safeParse({
            title, description, category
        });

        if(!validationResult.success){
            return NextResponse.json({
                success : false,
                error : "Validation failed",
                errors : validationResult.error.issues.map((err) => ({
                    field : err.path.join("."),
                    message : err.message
                }));
            }, {
                status : 400
            });
        }

        const validatedData = validationResult.data;

        

        await connectDb();



    }catch(err : any){
        console.error(err);
        return NextResponse.json({
            success : false,
            error : err.message
        }, {
            status : 500
        })
    }
})



