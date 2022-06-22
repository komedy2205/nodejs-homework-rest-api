const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: {
          message: "Not authorized",
        },
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: {
          message: "Not authorized",
        },
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: {
          message: "Not authorized",
        },
      });
    }
    next(error);
  }
};

module.exports = auth;