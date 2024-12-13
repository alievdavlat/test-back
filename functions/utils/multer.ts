import multer, { FileFilterCallback } from "multer";
import path from "path";
function checkFileType(file: any, cb: FileFilterCallback): void {
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images only! (jpeg, jpg, png, gif, mp4)"));
  }
}

// Configure storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  },
});
const experinceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "experince"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  },
});

const projectImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "project"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  },
});
const projectVideoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "project"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  },
});


const skillsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "skills"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  },
});

// Initialize multer with the storage settings and file filter
const upload = multer({
  storage: storage,
});
const uploadSkillsImage = multer({
  storage: skillsStorage,
});

const uploadExperienceLogo = multer({
  storage: experinceStorage,
});
const uploadProjectImage = multer({
  storage: projectImageStorage,
});
const uploadProjectVideo = multer({
  storage: projectVideoStorage,
});

export { upload, uploadExperienceLogo, uploadProjectImage, uploadProjectVideo, uploadSkillsImage };
