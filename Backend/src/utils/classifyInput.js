export const classifyInput = (question) => {
  const q = question.toLowerCase().trim();

  // greetings patterns
  const greetings = [
    "helo",
    "hi",
    "hey",
    "hello",
    "how are you",
    "what's up",
    "good morning",
    "good afternoon",
    "good evening",
    "greatings",
    "howdy",
    "sup",
  ];
  const normalizedQuestion = q.replace(/[.!?,]+$/, '');
  if (greetings.some((g) => normalizedQuestion === g || normalizedQuestion.startsWith(`${g} `))) {
    return "greeting";
  }

  // simple questions

  const simpleCalculations = /^[\d\s\+\-\×\*\/\÷\=\?]+$/;
  const simpleWords = [
    "what is 1",
    "what is 2",
    "what is 3",
    "calculate",
    "how much is",
  ];
  if (simpleCalculations.test(q) && q.length < 20) {
    return "simple_calculation";
  }
  if (simpleWords.some((w) => q.includes(w)) && q.length < 30) {
    return "simple_word";
  }

  // /out of the scope patterns
  const outOfScope = [
    "what is the meaning of life",
    "poem",
    "joke",
    "story",
    "capital",
    "history",
    "geography",
    "politics",
    "movie",
    "song",
    "food",
    "weather",
    "sex",
    "porn",
    "nudity",
  ];

  if (outOfScope.some((pattern) => q.includes(pattern))) {
    return "out_of_scope";
  }

  return "math";
};
