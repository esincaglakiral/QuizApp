// quizApi.js

import axios from 'axios';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data.slice(0, 10); // Get the first 10 questions
    return data.map((question, index) => ({
      id: question.id,
      questionText: question.title,
      options: generateOptions(question.body), // Generate answer options from the body content
      correctAnswer: 'A', // Assume 'A' is always the correct answer for now
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

const generateOptions = (text) => {
  // Parse the text content to generate answer options
  const options = ['A', 'B', 'C', 'D'];
  const words = text.split(/\s+/); // Split the text into words
  return options.reduce((acc, option, index) => {
    const startIndex = Math.floor((index / options.length) * words.length);
    const endIndex = Math.floor(((index + 1) / options.length) * words.length);
    const optionText = words.slice(startIndex, endIndex).join(' ');
    acc[option] = optionText;
    return acc;
  }, {});
};
