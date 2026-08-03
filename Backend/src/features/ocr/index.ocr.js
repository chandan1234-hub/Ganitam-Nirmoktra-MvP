import {createWorker} from 'tesseract.js';

(
    async () => {
         const worker = createWorker('eng');
         const ret = await worker.recognize();
         console.log(ret.data.text);
         (await worker).terminate();
    }
)