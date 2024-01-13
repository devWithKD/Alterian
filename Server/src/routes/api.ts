import express,{Request,Response} from "express";

const router = express.Router();

router.get('/v1',(req:Request,res:Response)=>{
  res.send("v1")
})

export default router