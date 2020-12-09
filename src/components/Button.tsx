import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({
  children,
  className,
  ...otherButtonProps
}: PropsWithChildren<IButtonProps>): JSX.Element => {
  return (
    <button
      className={`text-white uppercase px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
};

export default Button;
