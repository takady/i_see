import React from 'react';

const AnswerResult = ({ result, getNextQuestion }) => (
  <div className="AnswerResult">
    <h3>{`${result.result === 'correct' ? '◎' : '×'} ${result.correct_answer}`}</h3>
    <a href="javascript:void(0)" onClick={() => getNextQuestion()}>Next</a>
  </div>
);

export default AnswerResult;
