import React from 'react';
import HtmlInputType from '../../../common/types/HtmlInputType';
import classNames from '../../../common/utils/classNames';

type InputProps = {
  name: string;
  type: HtmlInputType;
  label: string;
  value: string;
  setValue: (val: string) => void;
  errorMessage: string;
  validate: () => void;
  placeholder?: string;
  description?: string;
};

export default function Input(props: InputProps): JSX.Element {
  const {
    name,
    description,
    type,
    label,
    value,
    errorMessage,
    validate,
    setValue,
    placeholder,
  } = props;

  const inputIsValid = () => {
    return errorMessage === '';
  };

  const invalidClasses =
    'border-red-300 text-red-900 placeholder-red-300 focus-visible:outline-none focus-visible:ring-red-500 focus-visible:border-red-500';
  const validClasses =
    'border-gray-300 focus-visible:ring-indigo-500 focus-visible:border-indigo-500';

  return (
    <div className="py-4 sm:py-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {description ? (
        <p className="text-sm text-gray-400">{description}</p>
      ) : (
        ''
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          className={classNames(
            'block w-full pr-10 sm:text-sm rounded-md appearance-none',
            inputIsValid() ? validClasses : invalidClasses,
          )}
          placeholder={placeholder}
          aria-invalid={!inputIsValid()}
          aria-describedby={`${name}-error`}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            validate();
          }}
        />
      </div>
      <p
        className={`mt-2 text-sm text-red-600 ${
          inputIsValid() ? 'hidden' : 'block'
        }`}
        id={`${name}-error`}
      >
        {errorMessage}
      </p>
    </div>
  );
}
