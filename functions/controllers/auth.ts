import { CustomErrorHandler } from "../error/error";
import { loginValidation } from "../validations/login.validation";
import Auth from "../model/auth.model";
import { sign } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/hashing";
import { Response, Request, NextFunction } from "express";

export default {
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error, value } = loginValidation.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const { username, password } = value as { username: string; password: string };

    try {
      const checkAdmin = await Auth.findOne({ username });

      if (!checkAdmin) {
        return next(new CustomErrorHandler(404, "User not found"));
      }

      let isValidPassword: boolean;
      let token: string;

      token = sign({ id: checkAdmin.id, username });
      isValidPassword = await comparePassword(password, checkAdmin.password);

      if (!isValidPassword) {
        return next(new CustomErrorHandler(400, "Username or password is not valid"));
      }

      res.status(200).json({
        status: 200,
        data: checkAdmin,
        token,
        msg: "User successfully logged in",
      });
    } catch (err: any) {
      return next(new CustomErrorHandler(500, err.message));
    }
  },

  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error, value } = loginValidation.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const { username, password } = value as { username: string; password: string };

    try {
      const checkAdmin = await Auth.findOne({ username });

      if (checkAdmin) {
        return next(new CustomErrorHandler(400, "User already exists"));
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await Auth.create({
        username,
        password: hashedPassword,
      });

      const token = sign({ id: newUser.id, username });

      res.status(201).json({
        status: 201,
        data: newUser,
        token,
        msg: "User successfully registered",
      });
    } catch (err: any) {
      return next(new CustomErrorHandler(500, err.message));
    }
  },
};
