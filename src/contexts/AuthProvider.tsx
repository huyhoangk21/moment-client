import { AxiosResponse } from 'axios';
import React, {
  useReducer,
  useEffect,
  createContext,
  PropsWithChildren,
  Dispatch,
} from 'react';
import axios from '../api/axios';

export enum AuthTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthState = {
  username: string | null;
};

interface LoginAction {
  type: AuthTypes.LOGIN;
  payload: string;
}

interface LogoutAction {
  type: AuthTypes.LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;

const INITIAL_STATE: AuthState = { username: null };

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      const { payload } = action;
      return { ...state, username: payload };
    case AuthTypes.LOGOUT:
      return { ...state, username: null };
    default:
      return state;
  }
};

export const AuthStateContext = createContext<AuthState>(null);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(null);

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch]: [AuthState, Dispatch<AuthAction>] = useReducer(
    reducer,
    INITIAL_STATE
  );

  useEffect(() => {
    const me = async (): Promise<void> => {
      try {
        const res: AxiosResponse<any> = await axios.get('/auth/me');
        const username: string = res.data.creator_name;
        dispatch({ type: AuthTypes.LOGIN, payload: username });
      } catch (err) {
        console.log(err);
      }
    };
    me();
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
