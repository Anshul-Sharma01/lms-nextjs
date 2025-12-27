import { z } from "zod";

export const courseCreationSchema = z.object({
    title : z
        .string()
        .min(5, "Course title must be at least 5 characters")
        .max(50, "Course title must not exceed 50 characters")
        .trim(),
    
    description : z
        .string()
        .min(50, "Course description must be at least 50 characters")
        .max(200, "Course description must not exceed 200 characters")
        .trim(),
    
    category : z
        .string()
});


export type courseCreation = z.infer < typeof courseCreationSchema >




