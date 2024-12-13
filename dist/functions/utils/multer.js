"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Function to check the file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('Error: Images only! (jpeg, jpg, png, gif)'));
    }
}
// Configure storage settings
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), 'public', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname + path_1.default.extname(file.originalname));
    }
});
// Initialize multer with the storage settings and file filter
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: checkFileType
});
exports.default = upload;
