import express from 'express';
import {extractText} from "./ocr.controller.js";
import {xXssProtection} from "helmet";
import {upload} from "../../middlewares/multer.middleware.js";


const router = express.Router();

router.post('/extract',xXssProtection , upload.single('image'),extractText)

export default router;