import React, { ReactElement } from 'react';

// styles
import './index.css';

export interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'success' | 'warning' | 'default';
  type?: 'button' | 'submit' | 'reset';
  count?: number;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button = ({
  label,
  variant = 'primary',
  size = 'sm',
  color = 'default',
  type = 'button',
  count = 0,
  isDisabled,
  isLoading,
  onClick,
}: ButtonProps): ReactElement => {
  const classes = `btn btn-${variant} btn-color-${color} btn-${size} ${
    isDisabled ? 'btn-disabled' : ''
  } ${isLoading ? 'btn-loading' : ''}`;

  return (
    <button type={type} className={classes} onClick={onClick} disabled={isDisabled || isLoading}>
      {isLoading && <span className="loader" />}
      <span>
        {label}
        {variant === 'primary' && count !== undefined && ` (${count})`}
      </span>
    </button>
  );
};

export default React.memo(Button);
