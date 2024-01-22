import express from "express";
import { userinfoV1 } from "../../controller/user.controller";

const router = express.Router();
router.get("/userinfo", userinfoV1);


export default router