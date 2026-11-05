import { z } from 'zod'

const gradeSchema = z
    .union([z.string(), z.number().int()])
    .optional()
    .transform((grade) => grade === undefined ? 'general' : String(grade).trim())
    .pipe(z.string().min(1, 'Grade cannot be empty.').max(50, 'Grade must be 50 characters or fewer.'))

export const solveProblemSchema = z.object({
    question: z.string()
        .trim()
        .min(1, 'A question is required.')
        .max(10_000, 'Question must be 10,000 characters or fewer.'),
    subject: z.string()
        .trim()
        .min(1, 'Subject cannot be empty.')
        .max(100, 'Subject must be 100 characters or fewer.')
        .default('mathematics'),
    grade: gradeSchema,
    solutionMode: z.enum(['single', 'multiple']).default('single'),
    examinerMode: z.boolean().default(false),
})

export const saveSolverHistorySchema = z.object({
    question: z.string()
        .trim()
        .min(1, 'A question is required.')
        .max(10_000, 'Question must be 10,000 characters or fewer.'),
    solution: z.string()
        .trim()
        .min(1, 'A solution is required.')
        .max(100_000, 'Solution must be 100,000 characters or fewer.'),
    subject: z.string()
        .trim()
        .min(1, 'Subject cannot be empty.')
        .max(100, 'Subject must be 100 characters or fewer.')
        .default('mathematics'),
    grade: gradeSchema,
})

export const ocrImageSchema = z.object({
    fieldname: z.literal('image'),
    originalname: z.string().trim().min(1).max(255),
    mimetype: z.enum(['image/jpeg', 'image/png', 'image/webp']),
    size: z.number().int().positive().max(5 * 1024 * 1024),
    path: z.string().min(1),
})
