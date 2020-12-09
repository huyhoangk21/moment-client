import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from '../api/axios';
import IMoment from '../interfaces/IMoment';
const socket = io('http://localhost:4000');
const useFetch = (searchTerm: string) => {
  const [moments, setMoments] = useState<IMoment[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(interval);
    };
  }, [searchTerm]);

  useEffect(() => {
    let fetch: boolean = true;
    const fetchMoments = async (): Promise<void> => {
      try {
        let res: AxiosResponse;
        if (debouncedSearchTerm) {
          res = await axios.get(`/moments/users/${debouncedSearchTerm}`);
        } else {
          res = await axios.get('/moments');
        }
        setMoments(res.data);
      } catch (err) {
        setMoments([]);
      }
    };
    if (fetch) fetchMoments();
    socket.on('new change', () => {
      if (fetch) setChange(!change);
    });
    return () => {
      fetch = false;
    };
  }, [change, debouncedSearchTerm]);

  return [moments];
};

export default useFetch;
