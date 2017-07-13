import React from 'react';
import $ from 'jquery';

class QuestionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {question: null, answerResult: null, firstTime: false};
    this.getQuestion = this.getQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.skipAnswer = this.skipAnswer.bind(this);
    this.renderAnswerArea = this.renderAnswerArea.bind(this);

    this.getQuestion();
  }

  getQuestion() {
    $.ajax({
      url: '/api/answers/new',
      dataType: 'json',
      success: function(question) {
        this.setState({question: question, answerResult: null, firstTime: question.first_time});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  submitAnswer(value) {
    $.ajax({
      url: '/api/answers',
      dataType: 'json',
      type: 'POST',
      data: {
        question_id: this.state.question.id,
        question_sentence: this.state.question.question_sentence,
        answer: value,
        started_at: this.state.question.started_at,
      },
      success: function(answer) {
        this.setState({answerResult: answer});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  skipAnswer() {
    $.ajax({
      url: '/api/answers',
      dataType: 'json',
      type: 'POST',
      data: {
        question_id: this.state.question.id,
        skip: true,
        started_at: this.state.question.started_at,
      },
      success: function() {
        this.getQuestion();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  renderAnswerArea() {
    if (this.state.answerResult) {
      return <AnswerResult result={this.state.answerResult} getNextQuestion={this.getQuestion}/>;
    } else if (this.state.firstTime) {
      return <NextButton skipAnswer={this.skipAnswer} />;
    } else {
      return <AnswerForm submitAnswer={this.submitAnswer} />;
    }
  }

  render() {
    if (this.state.question) {
      return (
        <div>
          <Question question={this.state.question} />
          {this.renderAnswerArea()}
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

const Question = ({ question }) => (
  <div>
    <h4>{`${question.id}: ${question.sentence}`}</h4>
    <h4>{question.question_sentence}</h4>
  </div>
);

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitAnswer(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Answer:
          <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus={true} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const AnswerResult = ({ result, getNextQuestion }) => (
  <div>
    <h3>{`${result.result == 'correct' ? "◎" : "×"} ${result.correct_answer}`}</h3>
    <a href='javascript:void(0)' onClick={() => getNextQuestion()}>Next</a>
  </div>
);

const NextButton = ({ skipAnswer }) => (
  <div>
    <a href='javascript:void(0)' onClick={() => skipAnswer()}>Next</a>
  </div>
);

export default QuestionBoard;
