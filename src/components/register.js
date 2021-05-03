import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import * as signupActions from "../actions/signup";
import { Form, Button, Card } from "react-bootstrap";

export const SignUp = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    props.reinitializeState();
  }, []);

  const register = (e) => {
    props.registerRequest(state);
    e.preventDefault();
  };

  const validateForm = () => {
    return state.username.length > 0 && state.password.length > 0;
  };

  const handleChange = (event) => {
    setState((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  return (
    <Card style={{ width: "18rem", margin: "0 auto", marginTop: "30px" }}>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        <Form onSubmit={(e) => register(e)}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={state.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              value={state.email}
              onChange={handleChange}
              type="email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={state.password}
              onChange={handleChange}
              type="password"
              minLength={8}
            />
          </Form.Group>
          <Button
            block
            disabled={!validateForm()}
            type="submit"
            variant="primary"
          >
            Register
          </Button>
          {props.state.loading && (
            <div>
              <br />
              Registering you...
            </div>
          )}
          {props.state.error && (
            <div>
              <br />
              {JSON.stringify(props.state.errorMessage.message)}
            </div>
          )}
          {props.state.success && (
            <div>
              <br />
              Success! You can now log in.
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.signup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (registerData) =>
      dispatch(signupActions.register(registerData)),
    reinitializeState: () => dispatch(signupActions.reinitializeState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
