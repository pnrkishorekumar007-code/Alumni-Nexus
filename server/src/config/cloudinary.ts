import { config } from "./index";

let cloudinaryInstance: any = null;

export async function initCloudinary() {
  if (!config.cloudinary.cloudName) {
    console.warn("Cloudinary not configured. File uploads will be disabled.");
    return null;
  }

  const cloudinary = (await import("cloudinary")).v2;
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
  cloudinaryInstance = cloudinary;
  return cloudinary;
}

export function getCloudinary() {
  return cloudinaryInstance;
}
