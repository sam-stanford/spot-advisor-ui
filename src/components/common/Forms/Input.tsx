import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import HtmlInputType from '../../../common/types/HtmlInputType';
import Tooltip from '../Tooltip';

type Validation = {
  isValid: (value: string) => boolean;
  error: string;
};

type InputProps = {
  name: string;
  type: HtmlInputType;
  label: string;
  value: string;
  initialValue: string | undefined;
  setValue: (val: string) => void;
  validations: Validation[];
  placeholder?: string;
  tooltip?: string;
};

export default function Input(props: InputProps): JSX.Element {
  const {
    name,
    type,
    label,
    value,
    initialValue,
    setValue,
    validations,
    placeholder,
    tooltip,
  } = props;

  const [error, setError] = useState('');

  const validate = (val: string) => {
    let isError = false;
    validations.forEach((v) => {
      if (!v.isValid(val)) {
        setError(v.error);
        isError = true;
      }
    });
    if (!isError) {
      setError('');
    }
  };

  const inputIsValid = () => {
    return error === '';
  };

  const helpIcon = tooltip ? (
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
      <Tooltip text="tooltip">
        <QuestionMarkCircleIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </Tooltip>
    </div>
  ) : undefined;

  const invalidClasses =
    'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500';
  const validClasses =
    'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          className={`block w-full pr-10 sm:text-sm rounded-md appearance-none ${
            inputIsValid() ? validClasses : invalidClasses
          }`}
          placeholder={placeholder}
          aria-invalid={!inputIsValid()}
          aria-describedby={`${name}-error`}
          defaultValue={initialValue}
          onChange={(e) => {
            setValue(e.target.value);
            if (error !== '') {
              setError('');
            }
          }}
          onBlur={() => {
            validate(value);
          }}
        />
        {helpIcon}
      </div>
      <p
        className={`mt-2 text-sm text-red-600 ${
          inputIsValid() ? 'hidden' : 'block'
        }`}
        id={`${name}-error`}
      >
        {error}
      </p>
    </div>
  );
}
