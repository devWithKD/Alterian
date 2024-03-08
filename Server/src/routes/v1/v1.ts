import express from "express";
import { userinfoV1 } from "../../controller/user.controller";
import nodesRouter from "./nodes/nodes.route"

const router = express.Router();
router.get("/userinfo", userinfoV1);

router.use("/nodes", nodesRouter);

export default router
