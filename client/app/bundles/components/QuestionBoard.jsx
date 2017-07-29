import React from 'react';
import axios from 'axios';

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

const Question = ({ question }) => (
  <div className="Question">
    <h4>{`${question.id}: ${question.sentence}`}</h4>
    <h4>{question.question_sentence}</h4>
  </div>
);

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitAnswer(this.state.value);
  }

  render() {
    return (
      <div className="AnswerForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer:
            <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const AnswerResult = ({ result, getNextQuestion }) => (
  <div className="AnswerResult">
    <h3>{`${result.result === 'correct' ? '◎' : '×'} ${result.correct_answer}`}</h3>
    <a href="javascript:void(0)" onClick={() => getNextQuestion()}>Next</a>
  </div>
);

const NextButton = ({ skipAnswer }) => (
  <div className="NextButton">
    <a href="javascript:void(0)" onClick={() => skipAnswer()}>Next</a>
  </div>
);

export default QuestionBoard;
