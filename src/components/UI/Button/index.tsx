import * as React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick = undefined,
  disabled,
  variant = 'primary',
  children,
}) => {
  let base =
    'relative w-full transition-all px-4 py-3.5 rounded font-bold disabled:opacity-40 disabled:cursor-not-allowed';

  if (disabled) {
    base += ' text-core-black-contrast-3 core-black-contrast';
  } else if (variant === 'primary') {
    base += ' text-black bg-white';
  } else if (variant === 'secondary') {
    base += ' text-white core-black-contrast-3';
  }

  return (
    <button className={base} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
