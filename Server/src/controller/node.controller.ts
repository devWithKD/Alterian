import { Request, Response, NextFunction } from "express";
import {
  createNode,
  deleteNode,
  getAllNodesEssential,
  getNote,
  updateNode,
} from "../services/node.service";
import createHttpError from "http-errors";

export const fetchNodeEssentials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nodeEssentials = await getAllNodesEssential(next);
    res.status(200).send(nodeEssentials);
    return;
  } catch (err) {
    next(createHttpError.InternalServerError("Something Went Wrong!"));
    return;
  }
};

export const fetchNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const nodeID = req.params.nodeID;
  if (!nodeID) {
    next(createHttpError.BadRequest("User ID is invalid or empty"));
  }
  const noteID = nodeID;
  try {
    const note = await getNote(noteID as string, next);
    res.status(200).send(note);
    return;
  } catch (err) {
    next(createHttpError.InternalServerError("Something Went Wrong!"));
    return;
  }
};

export const createNodeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.body)
    const node = await createNode(req.body, next);
    res.status(200).send(node);
    return;
  } catch (err) {
    next(createHttpError.InternalServerError("Something Went Wrong!"));
    return;
  }
};

export const patchNodeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.params.nodeID);
  const nodeID = req.params.nodeID;
  if (!nodeID) {
    next(createHttpError.BadRequest("User ID is invalid or empty"));
    return;
  }
  try {
    const updatedNode = await updateNode(nodeID as string, req.body, next);
    res.status(200).send(updatedNode);
    return;
  } catch (err) {
    next(createHttpError.InternalServerError("Something Went Wrong!"));
    return;
  }
};

export const deleteNodeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const nodeID = req.params.nodeID;
  if (!nodeID) {
    next(createHttpError.BadRequest("User ID is invalid or empty"));
    return;
  }
  try {
    const deletedNode = await deleteNode(nodeID as string, next);
    res.status(200).send(deletedNode);
    return;
  } catch (err) {
    next(createHttpError.InternalServerError("Something Went Wrong!"));
  }
};
