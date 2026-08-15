import { log } from 'console';
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI();
const filepath = 'audio.mp3'
const transcribeaudio = async (filepath) => {
    try {
        // read the local audio file from your file system
        const audioStream = fs.createReadStream('audio.mp3');

        // send the audio file directly to the whisper
        const transcription = await openai.audio.transcriptions.create({
            file: audioStream,
            model: "whisper-1",
        });

        // print the final text output
        console.log("transcription : ", transcription.text);

        // delete the file after getting the text from it 
        fs.unlinkSync(filepath)
        return transcription.text;

    } catch (error) {
        console.error('Error transcribing audio:', error);

        // when the openai api gets fail the audio delete automatically
        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath)
            console.log('file was deleted please upload it again');
        }
    }
}
