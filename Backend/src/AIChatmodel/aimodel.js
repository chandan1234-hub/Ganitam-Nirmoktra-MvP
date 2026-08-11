import { Ollama } from 'ollama'

const ollama = new Ollama()

const response = await ollama.chat({
    model: 'gpt-oss:120b-cloud',
    messages: [{ role: 'user', content: 'Explain quantum computing in 10 words' }],
    stream: true,
})
for await (const part of response) {
    process.stdout.write(part.message.content)
}


const findExistingProblem = async (question) => {

}

const solveMathProblemWithAI = async (question) => {

}

const saveToDatabase = async (question, solution) => {
}

const tools = [
    {
        name: 'findExistingProblem',
        description: 'search if the math problem was solved before and return the solution if it exists',
        function: findExistingProblem,
        parameters:{
            question:'the mnaths question to search for in the database'
        }
    },
    {
        name: 'solveMathProblemWithAI',
        description: 'use AI to solve a math problem and return the solution',
        function: solveMathProblemWithAI,
        parameters:{
            question:'the math question to solve'
        }
    },
    {
        name:'saveToDatabase',
        description:'save the math problem and its solution to the database',
        function:saveToDatabase,
        parameters:{
            question:'the math question to save',
            solution:'the solution to the math question'
        }
    }
]