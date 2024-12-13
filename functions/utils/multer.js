import multer from "multer";
import path from "path";

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png, gif)');
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', 'images'))
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() +  file.originalname + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


export default upload