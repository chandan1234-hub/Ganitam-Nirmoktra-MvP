import { createWorker } from 'tesseract.js';
import fs from 'fs';

const extractTextFromImage = async (imagePath) => {
    const worker = await createWorker('eng')
    try {
        const { data: { text } } = await worker.recognize(imagePath);
        const cleanText = text
            .replace(/\n+/g, " ")
            .trim()
        return cleanText;
    } catch (error) {
        throw new ApiError('Error extracting text from image', 500, error);
    }
    finally {
        await worker.terminate();
        fs.unlinkSync(imagePath);
    }

}

export default extractTextFromImage;