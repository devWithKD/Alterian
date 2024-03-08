import express from "express";
import {
  createNodeController,
  deleteNodeController,
  fetchNodeEssentials,
  fetchNote,
  patchNodeController,
} from "../../../controller/node.controller";

const router = express.Router();

router.post("/", createNodeController);

router.get("/", fetchNodeEssentials);

router.get("/:nodeID", fetchNote);

router.patch("/:nodeID", patchNodeController);

router.delete("/:nodeID", deleteNodeController);

export default router;
