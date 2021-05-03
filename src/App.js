import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import SignUp from "./components/register";
import Login from "./components/login";
import Profile from "./components/profile";
import { Navbar, Nav } from "react-bootstrap";
import { userService } from "./services/authentication";
import * as loginActions from "./actions/login";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userService.loggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = (props) => {
  useEffect(() => {
    props.getAuth();
  }, []);

  return (
    <Router>
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand>Authentication App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {!props.loginState.loggedIn && (
              <Nav.Link as={Link} to="/signup/">
                Sign up
              </Nav.Link>
            )}
            {!props.loginState.loggedIn && (
              <Nav.Link as={Link} to="/login/">
                Login
              </Nav.Link>
            )}
            {props.loginState.loggedIn && (
              <Nav.Link
                as={Link}
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  props.logoutRequest();
                }}
              >
                Log out
              </Nav.Link>
            )}
          </Nav>

          {props.loginState.loggedIn && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link to="/profile/">Profile</Link>
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Navbar>

        <Route path="/" exact component={Dashboard} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/login/" component={Login} />
        <PrivateRoute path="/profile/" component={Profile} />
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => dispatch(loginActions.logout()),
    getAuth: () => dispatch(loginActions.getAuth()),
  };
};

const mapStateToProps = (state) => {
  return {
    loginState: state.login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
