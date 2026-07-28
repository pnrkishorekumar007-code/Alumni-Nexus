import { getCloudinary } from "../config/cloudinary";
import type { CloudinaryUploadResult } from "../types";

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "srm-alumni-nexus"
): Promise<CloudinaryUploadResult> {
  const cloudinary = getCloudinary();
  if (!cloudinary) {
    throw new Error("Cloudinary not configured");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error: any, result: any) => {
        if (error) return reject(error);
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const cloudinary = getCloudinary();
  if (!cloudinary) {
    throw new Error("Cloudinary not configured");
  }

  await cloudinary.uploader.destroy(publicId);
}

export async function updateCloudinary(
  fileBuffer: Buffer,
  publicId: string,
  folder: string = "srm-alumni-nexus"
): Promise<CloudinaryUploadResult> {
  const cloudinary = getCloudinary();
  if (!cloudinary) {
    throw new Error("Cloudinary not configured");
  }

  await cloudinary.uploader.destroy(publicId);
  return uploadToCloudinary(fileBuffer, folder);
}
