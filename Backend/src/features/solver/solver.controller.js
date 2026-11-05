import { runMathAgent } from '../../services/SingleAgent/agent.service.js'
import { SolverHistory } from './solver.history.model.js'

export const solveProblem = async (req, res) => {
    const { question, subject = 'mathematics', grade = 'general', solutionMode = 'single', examinerMode = false } = req.body


    try {
        const result = await runMathAgent(question.trim(), subject, grade, solutionMode, examinerMode)
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.error('Ollama Cloud solver request failed:', error.message)
        return res.status(502).json({
            success: false,
            message: 'The AI solver is unavailable. Check the Ollama Cloud API key and configured model.',
        })
    }
}

export const saveSolverHistory = async (req, res) => {
    const { question, solution, subject = 'mathematics', grade = 'general' } = req.body


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
