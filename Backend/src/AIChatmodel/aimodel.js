import {Ollama} from 'ollama'

const ollama = new Ollama()

const response = await ollama.chat({
    model: 'gpt-oss:120b-cloud',
    messages: [{role: 'user', content: 'Explain quantum computing in 10 words'}],
    stream: true,
})
for await (const part of response) {
    process.stdout.write(part.message.content)
}


async function checkDataInDatabase(){

}

async function generateResponseFromModel(UserPrompt){

}


