import React from 'react';
import styled, { createGlobalStyle } from "styled-components"
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Unprotected from './components/Unprotected';

const GlobalStyle = createGlobalStyle`
  body {
    text-align: center;
    margin: 0px;
    font-family: "Roboto";
    background: #44c4e7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Ul = styled.ul`
  list-style-type:none;
  font:bold 11px Helvetica,Arial,sans-serif;
  text-transform:uppercase;
  margin:0;
  padding:0;
`;

const Li = styled.li`
  display:inline-block;
  background:#395870;
  background:linear-gradient(#54a7e3,#103652);
  padding:12px 20px;
  :hover {
    background:#1169b0;
    box-shadow:inset 0 0  10px 1px rgba(0,0,0,.3);
  }
  :first-child a {
    border-radius:4px 0 0 4px;
  }
  :last-child a {
    border-radius:0 4px 4px 0;
  }
`;

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color:#44c4e7;
  }
  text-decoration: none;
  color: #fff;
  margin:10px
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <nav>
        <Ul>
          <Li><StyledLink exact activeClassName='active-class' to="/">Login</StyledLink></Li>
          <Li><StyledLink exact activeClassName='active-class' to="/register">Register</StyledLink></Li>
          <Li><StyledLink exact activeClassName='active-class' to="/unprotected">Unprotected</StyledLink></Li>
          <Li><StyledLink exact activeClassName='active-class' to="/protected">Protected</StyledLink></Li>
        </Ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Login} style={{ backgroundColor: '#44c4e7' }}/>
          <Route path="/register" component={Register}/>
          <Route path="/protected" component={Protected}/>
          <Route path="/unprotected" component={Unprotected}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
