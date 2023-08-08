import React, { ChangeEvent, ReactElement } from 'react';
import './index.css';

export interface InputProps {
  name: string;
  value?: string;
  placeholder?: string;
  title?: string;
  variant: 'primary' | 'secondary';
  type?: 'text' | 'number';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  value,
  placeholder,
  title,
  variant,
  type,
  onChange,
}: InputProps): ReactElement => (
  <>
    {title ? (
      <div className="text-wrapper">
        <label>{title}</label>
        <input
          className={`text-input text-input-${variant}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    ) : (
      <input
        className={`text-input text-input-${variant}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    )}
  </>
);

export default React.memo(Input);
