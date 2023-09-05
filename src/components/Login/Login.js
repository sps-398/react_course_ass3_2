import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

function emailReducer(state, action) {
  if(action.type === 'USER_INPUT')
    return { value: action.val, isValid: action.val.includes('@') };
  if(action.type === 'INPUT_BLUR')
    return { value: state.value, isValid: state.value.includes('@') };
  return { value: '', isValid: false };
}

function passwordReducer(state, action) {
  if(action.type === 'USER_INPUT')
    return { value: action.val, isValid: action.val.trim().length > 6 };
  if(action.type === 'INPUT_BLUR')
    return { value: state.value, isValid: state.value.trim().length > 6 };
  return { value: '', isValid: false };
}

const Login = (props) => {
  const [enteredCollegeName, setCollgeName] = useState('');
  const [collegeNameIsValid, setCollgeNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: undefined });

  // useEffect(() => {
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length > 4
  //   );
  // }, [ enteredEmail, enteredPassword, enteredCollegeName ])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
        event.target.value.includes('@') && passwordState.value.trim().length > 6 && enteredCollegeName.trim().length > 4
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6 && enteredCollegeName.trim().length > 4
  );
  };

  const collegeNameChangeHandler = (event) => {
    setCollgeName(event.target.value);

    setFormIsValid(
      emailState.value.includes('@') && passwordState.value.trim().length > 6 && event.target.value.trim().length > 4
  );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const validateCollegeNameHandler = () => {
    setCollgeNameIsValid(enteredCollegeName.trim().length > 4);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college_name">College Name</label>
          <input
            type="text"
            id="college_name"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
