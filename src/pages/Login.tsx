import React, { Dispatch, FormEvent, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import useForm from '../hooks/useForm';
import axios from '../api/axios';
import {
  AuthAction,
  AuthDispatchContext,
  AuthTypes,
} from '../contexts/AuthProvider';

const Login = ({ history }: RouteComponentProps): JSX.Element => {
  const dispatch: Dispatch<AuthAction> = useContext(AuthDispatchContext);

  const [{ email, password }, resetValues, onChange] = useForm({
    email: '',
    password: '',
  });

  const onLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const res: AxiosResponse = await axios.post('/auth/login', {
        email,
        password,
      });
      const username: string = res.data.creator_name;
      resetValues();
      dispatch({ type: AuthTypes.LOGIN, payload: username });
      history.push('/');
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  return (
    <div className=''>
      <form onSubmit={onLogin} autoComplete='off'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={onChange}
        />
        <button type='submit'>Login</button>
        <small>
          Don't have an account? <Link to='/register'>Register</Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
