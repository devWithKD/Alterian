import mongoose from "mongoose";

export interface NodeDocument extends mongoose.Document {
  _id: string;
  title: string;
  type: string;
  parentID: string | null;
  body: string | null | undefined;
  tagIDs: Array<string> | null | undefined;
}

const nodeSchema = new mongoose.Schema({
  _id: { type: String },
  title: { type: String },
  type: { type: String },
  parentID: { type: String },
  body: { type: String },
  tagIDs: { type: Array<String> },
},{timestamps: true});

export const Node = mongoose.model<NodeDocument>("node", nodeSchema);
