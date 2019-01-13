import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { postDataNoAuth } from '../api';
import { baseUrl } from '../actions';
import { selectLoggedIn, selectPasswordResetToken } from '../selectors';
import { Link } from 'react-router-dom';
import { Form, Input, Label } from '../styled/Form';
import { H1 } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

class ResetPasswordConfirmPage extends Component {
  state = {
    submitted: false,
  }

  render() {
    if (this.props.loggedIn) {
      let nextPath = '/app/dashboard';
      if (this.props && this.props.location && this.props.location.state && this.props.location.state.nextPathname) {
        nextPath = this.props.location.state.nextPathname;
      }
      return <Redirect to={nextPath} />;
    } else {
      return (
      <React.Fragment>
        <H1>Confirm Password Reset</H1>
        {
          this.state.submitted ? (
            <div>
              Your password has been reset. <Link to="/app/login">
                Login!
              </Link>
            </div>
          ) : (
            <Formik
              initialValues={{
                password: '',
              }}
              validate={values => {
                const errors = {};
                if (!values.password || values.password.trim() === '') {
                  errors.password = 'You must set a new password.';
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                postDataNoAuth(`${baseUrl}/api/v1/auth/resetPasswordConfirm/`, {password: values.password, token: this.props.token})
                  .then(response => {
                    this.setState({submitted: true})
                    console.log('success', response);
                  })
                  .catch(error => {console.log('error', error)});
              }}
              render={({
                touched,
                errors,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Label htmlFor="password">
                    Password
                  </Label>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    border={
                      errors.password && "1px solid red"
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red">
                      {errors.password}
                    </div>
                  )}
                  <div>
                    <Button
                      type="submit"
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              )}
            />
          )
        }

      </React.Fragment>
    );
    }
  }
}

const select = state => ({
  loggedIn: selectLoggedIn(state),
  token: selectPasswordResetToken(state),
});

const actions = {};

export default connect(select, actions)(ResetPasswordConfirmPage);
