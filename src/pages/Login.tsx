import React, { Dispatch, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AxiosResponse } from 'axios';
import axios from '../api/axios';
import {
  AuthAction,
  AuthDispatchContext,
  AuthTypes,
} from '../contexts/AuthProvider';
import LoginSchema from '../utils/LoginSchema';
import Button from '../components/Button';
import TextField from '../components/TextField';

const Login = ({ history }: RouteComponentProps): JSX.Element => {
  const dispatch: Dispatch<AuthAction> = useContext(AuthDispatchContext);
  const [error, setError] = useState<string>('');
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ email, password }) => {
      email = email.trim().toLowerCase();
      try {
        const res: AxiosResponse = await axios.post('/auth/login', {
          email,
          password,
        });
        dispatch({ type: AuthTypes.LOGIN, payload: res.data.username });
        history.push('/');
      } catch (err) {
        setError(err.response.data.errors);
      }
    },
  });

  return (
    <div className='bg-gradient-to-r from-cyan-400 to-light-blue-500 w-full min-h-screen flex flex-col items-center justify-center text-white'>
      <FaUserCircle className='text-7xl' />
      <h1 className='text-3xl font-semibold mt-2'>Moment</h1>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='bg-white text-black flex flex-col w-80 py-5 px-5 shadow-2xl mt-5 mb-10'
      >
        <TextField
          id='email'
          type='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email || error}
          className='mt-4 mb-2'
        />
        <TextField
          id='password'
          type='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.errors.password || error}
          className='mt-2 mb-4'
        />
        <Button
          type='submit'
          disabled={formik.isSubmitting}
          className='my-2 bg-light-blue-500'
        >
          Login
        </Button>
        <small className='text-center'>
          Don't have an account?{' '}
          <Link to='/register' className='text-light-blue-500'>
            Register
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
