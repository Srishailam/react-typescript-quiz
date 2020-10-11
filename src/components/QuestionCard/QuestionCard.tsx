import React from 'react'
import { AnswerObject } from '../../App';
import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  max-width:1100px;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding:20px;
  box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
  text-align: center;
  
  p {
    font-size:1rem;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;
  :hover{
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width:100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
    correct ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
      : !correct && userClicked ? 'linear-gradient(90deg, #ff5656, #c16868)'
        : 'linear-gradient(90deg, #56ccff, #6eafb4)'};
    border: 3px solid $fff;
    box-shadow: 1px 2px 0px rgba(0,0,0,0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0,0,0,0.25);
  }
`;

type Props = {
  quesiton: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
  quesiton,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: quesiton }}></p>
      <div>
        {
          answers.map(answer => (
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <button disabled={!!userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </ButtonWrapper>
          ))
        }
      </div>
    </Wrapper>
  );

export default QuestionCard;