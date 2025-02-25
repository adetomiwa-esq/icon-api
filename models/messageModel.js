import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "you need to send "],
      unique: true,
    },
    from: {
      type: String,
      require: [true, "you need to add sender"],
    },
    to: {
      type: String,
      require: [true, "you need to add recepient"],
    },
    message: {
      type: String,
      require: [true, "you need to add message"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
