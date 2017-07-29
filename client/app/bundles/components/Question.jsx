import React from 'react';

const Question = ({ question }) => (
  <div className="Question">
    <h4>{`${question.id}: ${question.sentence}`}</h4>
    <h4>{question.question_sentence}</h4>
  </div>
);

export default Question;
