import { Course } from "@/models/course.model";
import slugify from "slugify";


export async function generateUniqueSlug(title : string) : Promise < string >{
    const baseSlug = slugify(title, {
        lower : true,
        strict : true
    })

    const existingSlugs = await Course.find({
        slug : { $regex : `^${baseSlug}(-\\d+)?$` },
    });

    if(existingSlugs.length == 0){
        return baseSlug;
    }

    const numbers = existingSlugs.map(doc => {
        const match = doc.slug.match(/-(\d+)$/);
        return match ? parseInt(match[1]) : 0;
    });

    const nextNumber = Math.max(...numbers) + 1;
    return `${baseSlug}-${nextNumber}`;

}







