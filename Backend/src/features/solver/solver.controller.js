import { generateSolution } from '../../AIChatmodel/aimodel.js'

export const solveProblem = async (req, res) => {
    const { question, subject = 'mathematics', grade = 'general' } = req.body

    if (!question?.trim()) {
        return res.status(400).json({ success: false, message: 'A question is required.' })
    }

    const solution = await generateSolution(question.trim(), subject, grade)
    return res.status(200).json({ success: true, data: { solution } })
}