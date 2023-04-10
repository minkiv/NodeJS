import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "WE17309",
    format: "png",
  },
});

const upload = multer({ storage: storage });

export const uploadMiddleware = upload.array("images", 10);
