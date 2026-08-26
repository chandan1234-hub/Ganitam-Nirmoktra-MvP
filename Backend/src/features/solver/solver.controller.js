import { generateSolution } from '../../AIChatmodel/aimodel.js'
import { SolverHistory } from './solver.history.model.js'

export const solveProblem = async (req, res) => {
    const { question, subject = 'mathematics', grade = 'general' } = req.body

    if (!question?.trim()) {
        return res.status(400).json({ success: false, message: 'A question is required.' })
    }

    try {
        const solution = await generateSolution(question.trim(), subject, grade)
        return res.status(200).json({ success: true, data: { solution } })
    } catch (error) {
        console.error('Ollama solver request failed:', error.message)
        return res.status(502).json({
            success: false,
            message: 'The AI solver is unavailable. Make sure Ollama is running and the configured model is installed.',
        })
    }
}

export const saveSolverHistory = async (req, res) => {
    const { question, solution, subject = 'mathematics', grade = 'general' } = req.body

    if (!question?.trim() || !solution?.trim()) {
        return res.status(400).json({ success: false, message: 'Question and solution are required.' })
    }

    const history = await SolverHistory.create({
        question: question.trim(),
        solution: solution.trim(),
        subject,
        grade,
    })

    return res.status(201).json({ success: true, data: { history } })
}

export const getSolverHistory = async (req, res) => {
    const history = await SolverHistory.find().sort({ createdAt: -1 }).limit(10).lean()
    return res.status(200).json({ success: true, data: { history } })
}