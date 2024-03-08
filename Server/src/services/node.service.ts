import { NextFunction } from "express";
import { Node, NodeDocument } from "../model/node.model";
import createHttpError from "http-errors";

export const getAllNodesEssential = async (next: NextFunction) => {
  try {
    const NodesEssentials = await Node.find(
      {},
      "_id title type parentID createdAt updatedAt",
    );
    return NodesEssentials;
  } catch (err) {
    console.log(err);
    next(createHttpError.InternalServerError("Something Went Wrong!"));
  }
};

export const getNote = async (noteID: string, next: NextFunction) => {
  try {
    const noteData = await Node.findById(noteID);
    return noteData;
  } catch (err) {
    console.log(err);
    next(createHttpError.InternalServerError("Something Went Wrong!"));
  }
};

export const createNode = async (
  nodeData: Partial<NodeDocument>,
  next: NextFunction,
) => {
  if (!nodeData._id) {
    next(createHttpError.BadRequest("UserID is required"));
    return;
  }
  const node = await Node.findById(nodeData._id);
  if (node) {
    next(createHttpError.BadRequest("Node with same ID alredy exist"));
    return;
  }
  const nodeOps: Partial<NodeDocument> = {
    _id: nodeData._id,
    title: nodeData.title || "Untitled",
    type: nodeData.type,
    parentID: nodeData.parentID,
  };
  if(nodeData.type == "note") {
    nodeOps.body = ""
    nodeOps.tagIDs = []
  }
  const newNode = new Node(nodeOps);

  return await newNode.save();
};

export const updateNode = async (
  nodeID: string,
  update: Partial<NodeDocument>,
  next: NextFunction,
) => {
  return await Node.findByIdAndUpdate(nodeID, update, {new: true});
};

export const deleteNode = async (nodeID: string, next: NextFunction) => {
  try {
    return await Node.findByIdAndDelete(nodeID);
  } catch (err) {
    console.log(err);
    next(createHttpError.InternalServerError("Something Went Wrong!"));
  }
};
