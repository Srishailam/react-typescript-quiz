import { shuffleArray } from './../utils/utils'
export type Quesiton = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Quesiton & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endPoint)).json();
  // console.log(data);
  return data.results.map((quesiton: Quesiton) => ({
    ...quesiton,
    answers: shuffleArray([...quesiton.incorrect_answers, quesiton.correct_answer])
  }));
}