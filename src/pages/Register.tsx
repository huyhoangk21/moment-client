import React, { CSSProperties, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import useForm from '../hooks/useForm';
import axios from '../api/axios';

const tempStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '450px',
};

const Register = ({ history }: RouteComponentProps): JSX.Element => {
  const [
    { username, email, password, repeatPassword },
    resetValues,
    onChange,
  ] = useForm({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const onRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      // check match password
      await axios.post('/auth/register', {
        creator_name: username,
        email,
        password,
      });
      resetValues();
      history.push('/login');
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  return (
    <div>
      <form onSubmit={onRegister} style={tempStyle} autoComplete='off'>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='username'
          name='username'
          value={username}
          onChange={onChange}
        />
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
        <label htmlFor='repeatPassword'>Repeat password</label>
        <input
          id='repeatPassword'
          type='password'
          name='repeatPassword'
          value={repeatPassword}
          onChange={onChange}
        />
        <button type='submit'>Register</button>
        <small>
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </form>
    </div>
  );
};

export default Register;
