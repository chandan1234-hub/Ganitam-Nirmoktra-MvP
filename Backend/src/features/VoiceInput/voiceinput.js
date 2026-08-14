import path from 'path';
import { nodewhisper } from 'nodejs-whisper';

// need to provide path to your audio file

const filePath = path.resolve(__dirname, 'audio.mp3');

await nodewhisper(filePath, {
    modelName: 'base',
    modelRootPath: '',
    whisperOptions: {
        timestamps_length: 20,
        noGpu: false,
        translateToEnglish: true,
        outputInText: true,
        wordTimestamps: false,
    }
})