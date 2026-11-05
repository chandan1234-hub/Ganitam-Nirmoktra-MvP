import express from 'express'
import { getSolverHistory, saveSolverHistory, solveProblem } from './solver.controller.js'
import { validateRequest } from '../../middlewares/validateRequest.middleware.js'
import { saveSolverHistorySchema, solveProblemSchema } from '../../utils/request.schemas.js'

const router = express.Router()

router.post('/solve', validateRequest(solveProblemSchema), solveProblem)
router.get('/history', getSolverHistory)
router.post('/history', validateRequest(saveSolverHistorySchema), saveSolverHistory)

export default router