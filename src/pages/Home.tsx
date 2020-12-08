import React, {
  Dispatch,
  useContext,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import {
  AuthStateContext,
  AuthDispatchContext,
  AuthState,
  AuthTypes,
  AuthAction,
} from '../contexts/AuthProvider';
import axios from '../api/axios';
import Upload from '../components/Upload';

const Home = ({ history }: RouteComponentProps): JSX.Element => {
  const state: AuthState = useContext(AuthStateContext);
  const dispatch: Dispatch<AuthAction> = useContext(AuthDispatchContext);
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    let fetch: boolean = true;
    const fetchMoments = async () => {
      try {
        const res: AxiosResponse = await axios.get('/snapshots');
        setMoments(prevMoments => [...prevMoments, ...res.data]);
      } catch (err) {
        console.log(err.response.data.errors);
      }
    };
    if (fetch) fetchMoments();
    return () => {
      fetch = false;
    };
  }, []);

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

  const renderedSnapshots = moments.map((snapshot, idx) => (
    <div key={idx} style={{ margin: '50px' }}>
      <p>{snapshot.title}</p>
      <p>{snapshot.description}</p>
      <p>{snapshot.selected_file}</p>
    </div>
  ));

  return (
    <div>
      {state.username}
      <button onClick={onLogout}>Logout</button>
      {renderedSnapshots}
      <Upload />
    </div>
  );
};

export default Home;
