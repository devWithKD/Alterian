import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends mongoose.Document {
  email: string | undefined;
  password: string | null | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  provider: string | null | undefined;
  authID: string | null | undefined;
  hasValidPass(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  provider: { type: String },
  authID: { type: String },
});

userSchema.methods.hasValidPass = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model<UserDocument>("user", userSchema);
