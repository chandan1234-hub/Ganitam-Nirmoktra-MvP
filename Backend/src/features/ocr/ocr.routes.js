import express from 'express';
import {extractText} from "./ocr.controller.js";
import {xXssProtection} from "helmet";
import { uploadSingleImage } from "../../middlewares/multer.middleware.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { ocrImageSchema } from "../../utils/request.schemas.js";
import { requireClerkAuth } from "../../middlewares/requireClerkAuth.middleware.js";


const router = express.Router();

router.use(requireClerkAuth);
router.post('/extract', xXssProtection, uploadSingleImage, validateRequest(ocrImageSchema, 'file'), extractText)

export default router;