import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true },
    confirm_password: { type: String, required: true },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
    created_at: { type: Date, default: Date.now },
    last_activity: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
