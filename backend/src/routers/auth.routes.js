import { Router } from "express";
import { validatorSchema } from "../middlewares/validate.midlewares.js";
import { loginSchema, registerSchema } from "../schema/auth.schema.js";
import {
  getAllUsers,
  login,
  logout,
  profile,
  register,
  setAvatar,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.post("/register", validatorSchema(registerSchema), register);
router.post("/login", validatorSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.post("/avatar/:id", authRequired, setAvatar);
router.get("/allUsers/:id", authRequired, getAllUsers);
router.get("*/profile", authRequired, profile);

export default router;
