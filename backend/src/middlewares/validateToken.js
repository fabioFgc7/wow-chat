import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized token" });
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    res.user = user;
    next();
  });
};
