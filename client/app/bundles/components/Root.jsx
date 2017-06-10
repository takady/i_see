import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import QuestionBoard from './QuestionBoard';

const Root = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/question">Question</Link></li>
      </ul>

      <Route exact path="/" component={Home}/>
      <Route path="/question" component={QuestionBoard}/>
    </div>
  </Router>
);

export default Root;
