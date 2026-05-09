import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type BaseProps = {
  label?: string;
  error?: string;
  className?: string;
};

type SingleLineInputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> & {
    multiline?: false;
  };

type MultiLineInputProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    multiline: true;
  };

type InputProps = SingleLineInputProps | MultiLineInputProps;

export const Input: React.FC<InputProps> = (props) => {
  const { label, error, multiline, className, ...rest } = props;

  return (
    <div className={clsx(styles.container, className)}>
      {label && <label className={styles.label}>{label}</label>}
      {multiline ? (
        <textarea
          className={clsx(styles.input, error && styles.inputError)}
          {...rest}
        />
      ) : (
        <input
          className={clsx(styles.input, error && styles.inputError)}
          {...rest}
        />
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
