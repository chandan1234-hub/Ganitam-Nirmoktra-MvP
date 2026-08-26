import { Ollama } from 'ollama'
import { buildCompletePrompt } from '../utils/promptBuilder.utils.js'

const getOllamaClient = () => new Ollama({
    host: process.env.OLLAMA_URL || process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
})

export const generateSolution = async (question, subject, grade) => {
    const { system, user } = buildCompletePrompt(question, subject, grade)
    const response = await getOllamaClient().chat({
        // llama3.2:latest is installed locally and responds reliably.
        // Set OLLAMA_MODEL in Backend/.env to override this default.
        model: process.env.OLLAMA_MODEL || 'llama3.2:latest',
        messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
        ],
        stream: false,
        options: {
            temperature: 0.2,
            num_predict: 800,
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