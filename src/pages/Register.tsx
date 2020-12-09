import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import { useFormik } from 'formik';
import axios from '../api/axios';
import RegisterSchema from '../utils/RegisterSchema';
import TextField from '../components/TextField';
import Button from '../components/Button';

const Register = ({ history }: RouteComponentProps): JSX.Element => {
  const [error, setError] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: RegisterSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ username, email, password }) => {
      username = username.trim();
      email = email.trim().toLowerCase();
      try {
        await axios.post('/auth/register', {
          username,
          email,
          password,
        });
        history.push('/login');
      } catch (err) {
        setError(err.response.data.errors);
      }
    },
  });

  return (
    <div className='bg-gradient-to-r from-cyan-400 to-light-blue-500 w-full min-h-screen flex flex-col items-center justify-center text-white'>
      <MdAddCircle className='text-7xl' />
      <h1 className='text-3xl font-semibold mt-2'>Create an account</h1>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete='off'
        className='bg-white text-black flex flex-col w-80 py-5 px-5 shadow-2xl mt-5 mb-10'
      >
        <TextField
          id='username'
          type='text'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username || (error && error.username)}
          className='mt-4 mb-2'
        />
        <TextField
          id='email'
          type='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email || (error && error.email)}
          className='my-2'
        />
        <TextField
          id='password'
          type='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          className='my-2'
        />
        <TextField
          id='repeatPassword'
          type='password'
          name='repeatPassword'
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.repeatPassword}
          className='mt-2 mb-4'
        />
        <Button
          type='submit'
          disabled={formik.isSubmitting}
          className='my-2 bg-light-blue-500'
        >
          Register
        </Button>
        <small className='text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-light-blue-500'>
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Register;
