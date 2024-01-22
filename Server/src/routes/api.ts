import express,{Request,Response} from "express";
import API_V1 from './v1/v1'
const router = express.Router();

router.use('/v1',API_V1)

export default router