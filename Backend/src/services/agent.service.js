import { classifyInput } from "../utils/classifyInput.js";
import { generateSolution } from "../AIChatmodel/aimodel.js";

export const MathAgent = async (question, subject = "mathematics", grade = "general", solutionMode = "single", examinerMode = false) => {
    const normalizedSolutionMode = solutionMode === "single" ? "single" : "multiple";
    const isExaminerMode = examinerMode === true || examinerMode === "true";
    const classification = classifyInput(question);


    if (classification === "greeting") {
        return {
            solution: "Hello ! I am Ganitam Nirmoktra your personal math assistant. I can help you with math problems and calculations. How can I assist you today?",
            source: 'static',
            problemId: null
        }
    }

    if (classification === "out_of_scope") {
        return {
            solution: "I'm sorry, but I can only assist with math-related questions. If you have a math problem or calculation, please feel free to ask!",
            source: 'static',
            problemId: null
        }
    }

    if (classification === "simple_calculation" && !isExaminerMode) {
        const simpleCalculationPrompt = `Calculate: ${question}. Give only the direct solution in one line. Do not include an explanation or methods.
Example format: "5 + 3 = 8"`;

        const solution = await generateSolution(simpleCalculationPrompt, subject, grade, normalizedSolutionMode, isExaminerMode);
        return { solution, source: "ai", problemId: null };
    }

    const solution = await generateSolution(question, subject, grade, normalizedSolutionMode, isExaminerMode);
    return { solution, source: "ai", problemId: null };
};
