import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import axios from '../api/axios';

type FetchState = {
  data: object[];
  error: object[];
  loading: boolean;
  success: boolean;
};

const useFetch = (axiosConfig: AxiosRequestConfig): FetchState => {
  const [state, setState] = useState<FetchState>({
    data: [],
    error: [],
    loading: true,
    success: false,
  });

  const fetch = async () => {
    try {
      const res: AxiosResponse = await axios(axiosConfig);
      setState({ ...state, data: [...res.data] });
    } catch (err) {
      setState({ ...state, error: [...err.response.data.errors] });
    }
  };
  fetch();
  setState({ ...state, loading: false });

  return state;
};

export default useFetch;
