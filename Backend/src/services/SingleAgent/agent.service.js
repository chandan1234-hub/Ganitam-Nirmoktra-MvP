import { classifyInput } from "../../utils/classifyInput";
import "./agent.service.md"

const runMathAgent = async (question, subject, grade, userId) => {

  const inputType = classifyInput(question);

  if ( inputType == "greeting" ) {
    return {
      message: `Hello! I am Ganitam Nirmoktra,
      your personal AI mathematics teacher and assistant
      How can I assist you today ? `,
      source: 'static',
      problemId: null
    };
  }
  if (category === 'outofscope') {
      return {
        solution: `I am specialized in mathematics only! 🧮
                   Ask me any math problem — algebra, geometry,
                   calculus, trigonometry — and I will help
                   you understand it completely! 😊`,
        source: 'static',  // no AI tokens used!
        problemId: null
      }
    }

    // For simple calculations
    if (category === 'simple') {
      // Still call AI but with simple prompt
      const simplePrompt = `
      Calculate: ${question}
      Give ONLY the direct answer.
      One line. No explanation. No methods.
      Example format: "2 + 1 = 3 ✓"
      `;

    }
}
