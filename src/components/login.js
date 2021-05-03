import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as loginActions from "../actions/login";
import { Form, Button, Card } from "react-bootstrap";

export const Login = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  useEffect(() => {
    props.reinitializeState();
  }, []);

  const login = (e) => {
    props.loginRequest(state);
    e.preventDefault();
  };

  const handleChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
  };

  const validateForm = () => {
    return state.username.length > 0 && state.password.length > 0;
  };
  return (
    <Card style={{ width: "18rem", margin: "0 auto", marginTop: "30px" }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form onSubmit={(e) => login(e)}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={state.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={state.password}
              onChange={handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            disabled={!validateForm()}
            type="submit"
            variant="primary"
          >
            Login
          </Button>
          {props.state.loading && (
            <div>
              <br />
              Logging you in...
            </div>
          )}
          {props.state.error && (
            <div>
              <br />
              {JSON.stringify(props.state.errorMessage.message)}
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.login,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginRequest: (loginData) =>
      dispatch(loginActions.login(loginData, ownProps)),
    reinitializeState: () => dispatch(loginActions.reinitializeState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
