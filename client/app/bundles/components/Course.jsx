import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import $ from 'jquery';

const Course = ({ match }) => (
  <div>
    <h2>Courses</h2>
    <ul>
      <li>
        <Link to={`${match.url}/standard`}>
          Standard course
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:courseId`} component={Questions}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a course.</h3>
    )}/>
  </div>
);

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/questions',
      dataType: 'json',
      success: function(result) {
        this.setState({data: result});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  renderQuestion(question) {
    return (
      <li key={question.id}>
        <Link to={`${this.props.match.url}/${question.id}`}>
          {question.sentence}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div>
        <h3>{this.props.match.params.courseId}</h3>
        <ul>
          {this.state.data.map(this.renderQuestion)}
        </ul>

        <Route path={`${this.props.match.url}/:questionId`} component={Question}/>
      </div>
    );
  }
}

const Question = ({ match }) => (
  <div>
    <h3>{match.params.questionId}</h3>
  </div>
);

export default Course;
