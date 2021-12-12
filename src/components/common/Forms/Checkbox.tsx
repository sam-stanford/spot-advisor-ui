import React from 'react';

export default function Checkbox(props: {
  name: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const { name, description, checked, onChange } = props;

  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          onChange={(e) => onChange(e.target.checked)}
          id={name}
          checked={checked}
          aria-describedby={`${name}-description`}
          name={name}
          type="checkbox"
          className="focus:ring-transparent focus-visible:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm text-left">
        <label htmlFor={name} className="font-medium text-gray-700" />
        {name}
        <p id={`${name}-description`} className="text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
