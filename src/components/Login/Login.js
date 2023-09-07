import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

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
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: undefined });
  const [formIsValid, setFormIsValid] = useState(false);


  // useEffect(() => {
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length > 4
  //   );
  // }, [ enteredEmail, enteredPassword, enteredCollegeName ])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
        event.target.value.includes('@') && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6
  );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailState.isValid}
          label='E-Mail'
          id='email'
          type='email'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordState.isValid}
          label='Password'
          id='password'
          type='password'
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
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
