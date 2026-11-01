import { generateSolution } from '../../AIChatmodel/aimodel.js'
import { classifyInput } from '../../utils/classifyInput.js'

export const OutputResponseChecklist = () => `
Before sending your response, silently review it using this checklist:
- Did you interpret the student's question correctly and answer what was asked?
- Are the calculations, algebraic transformations, units, and final result correct?
- Are the steps complete and understandable for the stated grade?
- Does the response follow the requested single or multiple solution mode?
- Where practical, did you verify the result using substitution, an inverse operation, or another check?
- Are mathematical expressions formatted clearly, and are assumptions stated?
Correct any issues you find. Do not include this checklist in the response.
`

export const runMathAgent = async (
  question,
  subject = 'mathematics',
  grade = 'general',
  solutionMode = 'single',
  examinerMode = false,
) => {
  const inputType = classifyInput(question)

  if (inputType === 'greeting') {
    return {
      solution: 'Hello! I am Ganitam Nirmoktra, your personal AI mathematics teacher. How can I help you with mathematics today?',
      source: 'static',
      problemId: null,
    }
  }

  if (inputType === 'out_of_scope') {
    return {
      solution: 'I specialize in mathematics. Ask me a question about algebra, geometry, arithmetic, trigonometry, or another math topic, and I will help you understand it.',
      source: 'static',
      problemId: null,
    }
  }

  const solution = await generateSolution(
    question,
    subject,
    grade,
    solutionMode,
    examinerMode,
    OutputResponseChecklist(),
  )

  return {
    solution,
    source: 'ai',
    problemId: null,
  }
}
