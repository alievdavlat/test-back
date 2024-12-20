import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../error//error";
import Auth from "../model/auth.model";
import Comments from "../model/comments.model";
import { uploadToCloud } from "../utils/uploader";
export default {
  upload_user_avatar: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await Auth.findById(id);

      if (!user) {
        return next(new CustomErrorHandler(404, "user not Found"));
      }
      let filename: any;

      if (req?.file) {
        const userAvatar = await uploadToCloud(req.file, "avatars");
        user.avatar = userAvatar;
        await user.save();
        res.status(200).json({
          status: 200,
          data: user,
          msg: "ok",
        });
      }
      // const imagePath = `/media/${filename}`;

      // user.avatar = imagePath;
    } catch (err: any) {
      return next(new CustomErrorHandler(500, err.message));
    }
  },
  upload_client_avatar: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const client = await Comments.findById(id);

      if (!client) {
        return next(new CustomErrorHandler(404, "client not Found"));
      }
      let filename: any;

      if (req?.file) {
        // filename = req.file.filename;
        const clientAvatar = await uploadToCloud(req.file, "avatars");
        client.avatar = clientAvatar;
        await client.save();
        res.status(200).json({
          status: 200,
          data: client,
          msg: "ok",
        });
      }
      // const imagePath = `/media/${filename}`;

      // client.avatar = imagePath;
    } catch (err: any) {
      return next(new CustomErrorHandler(500, err.message));
    }
  },
};
