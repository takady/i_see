import React from 'react';

const NextButton = ({ skipAnswer }) => (
  <div className="NextButton">
    <a href="javascript:void(0)" onClick={() => skipAnswer()}>Next</a>
  </div>
);

export default NextButton;
