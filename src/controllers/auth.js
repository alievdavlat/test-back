import { CustomErrorHandler } from "../error/error.js";
import { loginValidation } from "../validations/login.validation.js";
import Auth from "../model/auth.model.js";
import { sign } from "../utils/jwt.js";
import { hashPassword, comparePassword} from "../utils/hashing.js"

export default {
  login: async (req, res, next) => {
    const { error, value } = loginValidation.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(error.message, 400));
    }

    const { username, password } = value;

    try {
      const checkAdmin = await Auth.findOne({ username });

      if (!checkAdmin) {
        return next(new ErrorHandler("User not found", 404));
      }

      let isValidPassword;
      let token;

      if (checkAdmin) {
        token = sign({ id: checkAdmin.id, username });
        isValidPassword = await comparePassword(password, checkAdmin.password);
      }

      if (!isValidPassword) {
        return next(
          new CustomErrorHandler("Username or password is not valid", 400)
        );
      }

      res.status(200).json({
        status: 200,
        data: checkAdmin,
        token,
        msg: "User successfully logged in",
      });
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 400));
    }
  },
  register: async (req, res, next) => {
    const { error, value } = loginValidation.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(error.message, 400));
    }

    const { username, password } = value;

    try {
      const checkAdmin = await Auth.findOne({ username });

      if (checkAdmin) {
        return next(new ErrorHandler("User already exist", 400));
      }
      let hashedPassword = await hashPassword(password)
      const newUser = await Auth.create({
        username,
        password:hashedPassword
      });
    

      let token = sign({ id: newUser.id, username });
      res.status(201).json({
        status:201,
        data:newUser,
        token,
        msg:'user successfuly registered'
      })
    
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 400));
    }
  },
};
