import Auth from "../model/auth.model.js";
import { CustomErrorHandler } from "../error/error.js";
import { verify } from "../utils/jwt.js";
export default {
  GET: async (req, res, next) => {
    try {
      const { token } = req.body;
      const {accesstoken} = req.headers
      const { id, username } = verify(accesstoken || token);

      const currentUser = await Auth.findById(id);

      if (!currentUser) {
        return next(new CustomErrorHandler("User not found", 404));
      }

      res.status(200).json({
        status: 200,
        data: currentUser,
        msg: "ok",
      });
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 500));
    }
  },
};
