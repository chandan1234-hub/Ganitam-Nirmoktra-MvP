import { runMathAgent } from '../../services/SingleAgent/agent.service.js'
import { SolverHistory } from './solver.history.model.js'
import { ensureClerkUser, recordSolutionUsage } from '../user/user.service.js'

export const solveProblem = async (req, res) => {
    const { question, subject = 'mathematics', grade = 'general', solutionMode = 'single', examinerMode = false } = req.body


    try {
        await ensureClerkUser(req.auth.clerkId)
    } catch (error) {
        console.error('Could not ensure the solver account:', error.message)
        return res.status(503).json({
            success: false,
            message: 'Your account is unavailable right now. Please try again.',
        })
    }

    try {
        const result = await runMathAgent(question.trim(), subject, grade, solutionMode, examinerMode)
        try {
            await recordSolutionUsage(req.auth.clerkId)
        } catch (usageError) {
            console.error('Could not record solution usage:', usageError.message)
        }
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
        clerkId: req.auth.clerkId,
        question: question.trim(),
        solution: solution.trim(),
        subject,
        grade,
    })

    return res.status(201).json({ success: true, data: { history } })
}

export const getSolverHistory = async (req, res) => {
    const history = await SolverHistory.find({ clerkId: req.auth.clerkId }).sort({ createdAt: -1 }).limit(10).lean()
    return res.status(200).json({ success: true, data: { history } })
}
