import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import Course from './Course';

const Root = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/course">Course</Link></li>
      </ul>

      <Route exact path="/" component={Home}/>
      <Route path="/course" component={Course}/>
    </div>
  </Router>
);

export default Root;
