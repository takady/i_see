import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

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

    <Route path={`${match.url}/:courseId`} component={Question}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a course.</h3>
    )}/>
  </div>
);

const Question = ({ match }) => (
  <div>
    <h3>{match.params.courseId}</h3>
  </div>
);

export default Course;
