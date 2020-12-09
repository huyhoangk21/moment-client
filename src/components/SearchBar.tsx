import React from 'react';
import { FaSearch } from 'react-icons/fa';
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='relative focus-within:text-light-blue-500 text-gray-500'>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        type='text'
        id='search'
        name='search'
        placeholder='search moments by username'
        autoComplete='off'
        autoCorrect='off'
        className='border-b border-gray-300 focus:outline-none focus:border-light-blue-500 w-96 px-2 py-1 text-black'
      />
      <FaSearch className='absolute right-2 top-2' />
    </div>
  );
};

export default SearchBar;
