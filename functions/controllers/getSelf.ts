import Auth from "../model/auth.model";
import { CustomErrorHandler } from "../error/error";
import { verify } from "../utils/jwt";
import { Response, Request, NextFunction } from "express";

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Extract token from headers or body
      const { token } = req.body;
      const accesstoken = req.headers.accesstoken as string;

      // Verify token to extract user information
      const decoded = verify(accesstoken || token);

      // Check if the decoded token is valid and contains 'id'
      if (typeof decoded === 'string') {
        return next(new CustomErrorHandler(401, decoded)); // If token is invalid, return error
      }

      const { id } = decoded;

      const currentUser = await Auth.findById(id);

      if (!currentUser) {
        return next(new CustomErrorHandler(404, "User not found"));
      }

      // Send response with user data
      res.status(200).json({
        status: 200,
        data: currentUser,
        msg: "ok",
      });
    } catch (err: any) {
      // Handle any errors
      next(new CustomErrorHandler(500, err.message));
    }
  },
};
