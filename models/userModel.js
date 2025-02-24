import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please include mail"],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
