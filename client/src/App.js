import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Unprotected from './components/Unprotected';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navigation">
        <ul>
          <li><NavLink className="alink" exact activeClassName='active-class' to="/">Login</NavLink></li>
          <li><NavLink className="alink" exact activeClassName='active-class' to="/register">Register</NavLink></li>
          <li><NavLink className="alink" exact activeClassName='active-class' to="/unprotected">Unprotected</NavLink></li>
          <li><NavLink className="alink" exact activeClassName='active-class' to="/protected">Protected</NavLink></li>
        </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Login} style={{ backgroundColor: '#44c4e7' }}/>
          <Route path="/register" component={Register}/>
          <Route path="/protected" component={Protected}/>
          <Route path="/unprotected" component={Unprotected}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
