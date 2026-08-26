import express from 'express'
import { getSolverHistory, saveSolverHistory, solveProblem } from './solver.controller.js'

const router = express.Router()

router.post('/solve', solveProblem)
router.get('/history', getSolverHistory)
router.post('/history', saveSolverHistory)

export default router