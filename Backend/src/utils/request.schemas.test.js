import assert from 'node:assert/strict'
import test from 'node:test'
import {
    ocrImageSchema,
    saveSolverHistorySchema,
    solveProblemSchema,
} from './request.schemas.js'

test('solve schema trims text and applies defaults', () => {
    const result = solveProblemSchema.safeParse({ question: '  solve 2 + 2  ' })

    assert.equal(result.success, true)
    assert.deepEqual(result.data, {
        question: 'solve 2 + 2',
        subject: 'mathematics',
        grade: 'general',
        solutionMode: 'single',
        examinerMode: false,
    })
})

test('solve schema rejects blank questions and invalid options', () => {
    const blankQuestion = solveProblemSchema.safeParse({ question: '   ' })
    const invalidOptions = solveProblemSchema.safeParse({
        question: 'solve 2 + 2',
        solutionMode: 'fast',
        examinerMode: 'false',
    })

    assert.equal(blankQuestion.success, false)
    assert.equal(invalidOptions.success, false)
})

test('history schema requires a non-empty question and solution', () => {
    const result = saveSolverHistorySchema.safeParse({ question: 'x', solution: '  ' })

    assert.equal(result.success, false)
})

test('OCR schema accepts supported images up to 5 MB', () => {
    const image = {
        fieldname: 'image',
        originalname: 'question.png',
        mimetype: 'image/png',
        size: 1024,
        path: 'public/temp/question.png',
    }

    assert.equal(ocrImageSchema.safeParse(image).success, true)
    assert.equal(ocrImageSchema.safeParse({ ...image, size: 5 * 1024 * 1024 + 1 }).success, false)
    assert.equal(ocrImageSchema.safeParse({ ...image, mimetype: 'application/pdf' }).success, false)
})
