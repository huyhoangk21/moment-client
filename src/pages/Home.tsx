import React, { Dispatch, useContext, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  AuthStateContext,
  AuthDispatchContext,
  AuthState,
  AuthTypes,
  AuthAction,
} from '../contexts/AuthProvider';
import axios from '../api/axios';

const Home = ({ history }: RouteComponentProps): JSX.Element => {
  const state: AuthState = useContext(AuthStateContext);
  const dispatch: Dispatch<AuthAction> = useContext(AuthDispatchContext);

  const onLogout = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault();
      await axios.get('/auth/logout');
      dispatch({ type: AuthTypes.LOGOUT });
      history.push('/login');
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  return (
    <div>
      {state.username}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
