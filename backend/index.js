import express from "express";
import morgan from "morgan";
import authRouter from "./src/routers/auth.routes.js";
import { Server } from "socket.io";
import messageRouter from "./src/routers/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { conectDB } from "./db.js";
import { PORT } from "./config.js";
export const app = express();
conectDB();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
const server = app.listen(PORT, () => console.log("Listening on port", PORT));
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
