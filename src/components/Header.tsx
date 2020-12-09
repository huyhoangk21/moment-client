import React, { useContext } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { AuthTypes, AuthDispatchContext } from '../contexts/AuthProvider';
import Button from './Button';
import SearchBar from './SearchBar';

const Header = (props: any): JSX.Element => {
  const dispatch = useContext(AuthDispatchContext);
  return (
    <header className='flex justify-between px-60 items-center h-20 fixed w-full bg-white z-50 shadow-sm'>
      <h1 className='text-4xl font-bold text-light-blue-500'>Moment</h1>
      <SearchBar {...props} />
      <Button
        type='button'
        className='bg-red-500 flex flex-row items-center justify-center'
        onClick={() => {
          dispatch({ type: AuthTypes.LOGOUT });
        }}
      >
        <FaPowerOff /> Log Out
      </Button>
    </header>
  );
};

export default Header;
