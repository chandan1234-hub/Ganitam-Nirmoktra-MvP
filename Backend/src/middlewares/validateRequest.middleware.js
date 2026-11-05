import { unlink } from 'node:fs/promises'

export const validateRequest = (schema, source = 'body') => async (req, res, next) => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
        if (source === 'file' && req.file?.path) {
            await unlink(req.file.path).catch(() => {})
        }

        return res.status(400).json({
            success: false,
            message: 'Request validation failed.',
            errors: result.error.issues.map(({ path, message }) => ({
                field: path.length ? path.join('.') : source,
                message,
            })),
        })
    }

    req[source] = result.data
    return next()
}
