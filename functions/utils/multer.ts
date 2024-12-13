import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

// Function to check the file type
function checkFileType(file: any, cb: FileFilterCallback): void {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images only! (jpeg, jpg, png, gif)'));
  }
}

// Configure storage settings
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: (error: Error | null, destination: string) => void): void {
    cb(null, path.join(process.cwd(), 'public', 'images'));
  },
  filename: function (req: Request, file: any, cb: (error: Error | null, filename: string) => void): void {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  }
});

// Initialize multer with the storage settings and file filter
const upload = multer({
  storage: storage,
  fileFilter: checkFileType
});

export default upload;
