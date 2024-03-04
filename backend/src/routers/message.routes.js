import { Router } from "express";
import {
  addMessage,
  deleteMessage,
  getMessage,
} from "../controllers/message.controller.js";
const router = Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessage);
router.delete("/message/:id", deleteMessage);

export default router;
