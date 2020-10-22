const qna = require('@tensorflow-models/qna');

// Load the model.
const model = await qna.load();

// Finding the answers
const answers = await model.findAnswers(question, passage);

console.log('Answers: ');
console.log(answers);
