import { Ollama } from 'ollama'
import { buildCompletePrompt } from '../utils/promptBuilder.utils.js'

const ollama = new Ollama()

export const generateSolution = async (question, subject, grade) => {
    const { system, user } = buildCompletePrompt(question, subject, grade)
    const response = await ollama.chat({
        model: process.env.OLLAMA_MODEL || 'gpt-oss:120b-cloud',
        messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
        ],
        stream: false,
        options: {
            temperature: 0.2,
            num_predict: 2000,
        },
    })

    return response.message?.content || ''
}






























// for the agentic workflow, we will need to define the tools that the agent can use to solve the math problem. The tools will be functions that can be called by the agent to perform specific tasks. The agent will use these tools to find existing problems, solve new problems, and save solutions to the database.

// const findExistingProblem = async (question) => {

// }

// const solveMathProblemWithAI = async (question) => {

// }

// const saveToDatabase = async (question, solution) => {
// }

// const tools = [
//     {
//         name: 'findExistingProblem',
//         description: 'search if the math problem was solved before and return the solution if it exists',
//         function: findExistingProblem,
//         parameters:{
//             question:'the mnaths question to search for in the database'
//         }
//     },
//     {
//         name: 'solveMathProblemWithAI',
//         description: 'use AI to solve a math problem and return the solution',
//         function: solveMathProblemWithAI,
//         parameters:{
//             question:'the math question to solve'
//         }
//     },
//     {
//         name:'saveToDatabase',
//         description:'save the math problem and its solution to the database',
//         function:saveToDatabase,
//         parameters:{
//             question:'the math question to save',
//             solution:'the solution to the math question'
//         }
//     }
// ]