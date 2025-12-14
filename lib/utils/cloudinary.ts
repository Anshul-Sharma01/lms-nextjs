import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function uploadToCloudinary(
    file: File | Buffer,
    folder: string = "lms/avatars"
): Promise<{ public_id: string; secure_url: string }> {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            throw new Error("Cloudinary configuration is missing");
        }

        let buffer: Buffer;
        if (file instanceof File) {
            const arrayBuffer = await file.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        } else {
            buffer = file;
        }

        const stream = Readable.from(buffer);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: "image",
                    transformation: [
                        { width: 500, height: 500, crop: "fill", gravity: "face" }, 
                        { quality: "auto" }, 
                        { format: "webp" }, 
                    ],
                },
                (error, result) => {
                    if (error) {
                        reject(new Error(`Cloudinary upload failed: ${error.message}`));
                        return;
                    }
                    if (!result) {
                        reject(new Error("Cloudinary upload returned no result"));
                        return;
                    }
                    resolve({
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    });
                }
            );

            stream.pipe(uploadStream);
        });
    } catch (error: any) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}


export async function deleteFromCloudinary(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
        throw new Error(`Failed to delete image: ${error.message}`);
    }
}