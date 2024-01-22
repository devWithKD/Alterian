import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  provider: {type: String},
  authID: { type: String },
});

export const User = mongoose.model("user", userSchema);

export type UserType = {
  email: string|undefined,
  password: string|null|undefined,
  firstName: string|undefined,
  lastName: string|undefined,
  provider: string|null|undefined,
  authID: string|null|undefined,
}
