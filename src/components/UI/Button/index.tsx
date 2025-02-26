import * as React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "reset" | "button";
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick = undefined,
  disabled,
  variant = 'primary',
  children,
  loading = false,
  type,
}) => {
  let base =
    'relative w-full transition-all px-4 py-3.5 rounded font-bold disabled:opacity-40 disabled:cursor-not-allowed';

  if (disabled) {
    base += ' text-core-black-contrast-3 bg-contrast2';
  } else if (variant === 'primary') {
    base += ' text-black bg-white';
  } else if (variant === 'secondary') {
    base += ' text-white core-black-contrast-3 hover:opacity-80';
  }

  if (disabled && variant === 'secondary') {
    base += ' text-white core-black-contrast-3';
  }

  if (loading) {
    base += ' opacity-60';
  }

  return (
    <button type={type} className={base} onClick={onClick} disabled={disabled}>
      {!loading && <>{children}</>}
      {loading && <div className="text-white spinner spinner--small" />}
    </button>
  );
};

export default Button;
