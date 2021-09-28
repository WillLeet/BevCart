import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const notify = (data) => {
    toast.warning(data);
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit} name={name} className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="username" className="sr-only">
            <small>Username:</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="password" className="sr-only">
            <small>Password:</small>
          </label>
          <input name="password" type="password" />
        </div>
        {displayName === "Sign Up" ? (
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="email" className="sr-only">
              <small>email:</small>
            </label>
            <input name="email" type="email" />
          </div>
        ) : null}
        <div>
          <button type="submit" className="btn btn-primary mb-2">
            {displayName}
          </button>
        </div>
        {error &&
          error.response && <div> {error.response.data} </div> &&
          notify(error.response.data)}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email ? evt.target.email.value : null;
      const authenticateStatement = email
        ? [formName, username, password, email]
        : [formName, username, password];
      await dispatch(authenticate(authenticateStatement));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
