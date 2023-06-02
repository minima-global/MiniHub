import * as React from 'react';

const Button = ({ variant = 'primary', children }: any) => {
  let base = 'w-full px-4 py-3.5 rounded font-bold disabled:opacity-40 disabled:cursor-not-allowed';

  if (variant === 'primary') {
    base += ' text-black bg-white';
  } else if (variant === 'secondary') {
    base += ' core-grey-5 bg-white';
  }

  return (
    <button
      className={base}
    >
      {children}
    </button>
  )
}

export default Button;

