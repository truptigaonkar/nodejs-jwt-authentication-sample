import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
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
          <li><Link className="link" to="/">Login</Link></li>
          <li><Link className="link" to="/register">Register</Link></li>
          <li><Link className="link" to="/unprotected">Unprotected</Link></li>
          <li><Link className="link" to="/protected">Protected</Link></li> 
        </ul>
        </nav>
        <Route exact path="/" component={Login} style={{ backgroundColor: '#44c4e7' }}/>
        <Route path="/register" component={Register}/>
        <Route path="/protected" component={Protected}/>
        <Route path="/unprotected" component={Unprotected}/>
      </Router>
    </div>
  );
}

export default App;
