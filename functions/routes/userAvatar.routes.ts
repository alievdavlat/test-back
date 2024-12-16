import { Router } from "express";
import UploadAvatarController from '../controllers/upload-avatar'
import {upload} from "../utils/multer";


const AvatarRouter = Router();


AvatarRouter
.put('/avatar-upload/:id', UploadAvatarController.upload_user_avatar)
.put('/client-avatar-upload/:id', UploadAvatarController.upload_client_avatar)



export default AvatarRouter