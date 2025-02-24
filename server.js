import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import Message from "./models/messageModel.js";
import connectDB from "./config/db.js";
import router from "./routes/userRoute.js";

configDotenv();

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Frontend URL
    // origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for messages
  socket.on("send_message", async (data) => {
    console.log(data);
    const newMessage = new Message(data);
    // io.emit("receive_message", data); // Broadcast the message to all users
    try {
      await newMessage.save(); // Save to database
      io.emit("receive_message", data); // Broadcast to all clients
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", router);

server.listen("5000", () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
