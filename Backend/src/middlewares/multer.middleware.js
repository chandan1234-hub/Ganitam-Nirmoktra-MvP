import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})

export const upload = multer({
    storage,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024,
    },
})

export const uploadSingleImage = (req, res, next) => {
    upload.single('image')(req, res, (error) => {
        if (!error) return next()

        if (error instanceof multer.MulterError) {
            const message = error.code === 'LIMIT_FILE_SIZE'
                ? 'Image must be 5 MB or smaller.'
                : 'Invalid image upload.'
            return res.status(400).json({ success: false, message })
        }

        return next(error)
    })
}
