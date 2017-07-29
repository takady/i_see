import React from 'react';
import axios from 'axios';
import AnswerForm from './AnswerForm';
import AnswerResult from './AnswerResult';
import NextButton from './NextButton';
import Question from './Question';

class QuestionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: null, answerResult: null, firstTime: false };
    this.getQuestion = this.getQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.skipAnswer = this.skipAnswer.bind(this);
    this.renderAnswerArea = this.renderAnswerArea.bind(this);

    this.getQuestion();
  }

  getQuestion() {
    axios.get('/api/answers/new')
      .then((response) => {
        this.setState({
          question: response.data,
          answerResult: null,
          firstTime: response.data.first_time,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  submitAnswer(value) {
    axios.post('/api/answers', {
      question_id: this.state.question.id,
      question_sentence: this.state.question.question_sentence,
      answer: value,
      started_at: this.state.question.started_at,
    }).then((response) => {
      this.setState({ answerResult: response.data });
    }).catch((error) => {
      console.error(error);
    });
  }

  skipAnswer() {
    axios.post('/api/answers', {
      question_id: this.state.question.id,
      skip: true,
      started_at: this.state.question.started_at,
    }).then(() => {
      this.getQuestion();
    }).catch((error) => {
      console.error(error);
    });
  }

  renderAnswerArea() {
    if (this.state.answerResult) {
      return <AnswerResult result={this.state.answerResult} getNextQuestion={this.getQuestion} />;
    } else if (this.state.firstTime) {
      return <NextButton skipAnswer={this.skipAnswer} />;
    }
    return <AnswerForm submitAnswer={this.submitAnswer} />;
  }

  render() {
    if (this.state.question) {
      return (
        <div className="QuestionBoard">
          <Question question={this.state.question} />
          {this.renderAnswerArea()}
        </div>
      );
    }
    return (
      <div className="QuestionBoard" />
    );
  }
}

export default QuestionBoard;
