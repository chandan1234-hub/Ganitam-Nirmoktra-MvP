import express from 'express';
import {extractText} from "./ocr.controller.js";
import {xXssProtection} from "helmet";



const router = express.Router();

router.post('/extract',xXssProtection , upload.single('image'),extractText)

export default router;