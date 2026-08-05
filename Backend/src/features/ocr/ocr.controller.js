import extractTextFromImage from './index.ocr.js';

export const extractText = async (req, res) => {
    try {
        // check if file is uploaded
        if (!req.file) {
            return res.status(400).json({
                message: 'please upload a file',
            })
        }
        const extractedText = await extractTextFromImage(req.file.path);

        if (!extractedText || extractedText.length < 3) {
            return res.status(400).json({
                message: 'could not extract file from image, please try a clearer image',

            })
        }
        //     return the extracted text to frontend

        res.status(200).json({
            success: true,
            extractedQuestion: extractedText,
        })
    } catch (err) {
        return res.status(400).json({
            message: error.message,
        })
    }


}
