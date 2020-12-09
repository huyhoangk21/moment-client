import React, { InputHTMLAttributes } from 'react';

interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

const TextField = ({
  className,
  error,
  ...otherInputProps
}: ITextFieldProps): JSX.Element => {
  return (
    <div
      className={`relative text-gray-500 focus-within:text-light-blue-500 ${className}`}
    >
      <label
        htmlFor={otherInputProps.id}
        className={`absolute -top-2 left-3 bg-white z-10 px-1 text-xs capitalize ${
          error && 'text-red-500'
        }`}
      >
        {otherInputProps.name}
      </label>
      <input
        {...otherInputProps}
        className={`w-full px-3 py-2 focus:outline-none border border-gray-300 focus:border-light-blue-500 text-black ${
          error && 'border-red-500'
        }`}
      />
      <small className='text-red-500'>{error}</small>
    </div>
  );
};

export default TextField;
