import React from 'react';

export default function Checkbox(props: {
  id: string;
  name: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const { id, name, description, checked, onChange } = props;

  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          onChange={(e) => onChange(e.target.checked)}
          id={id}
          checked={checked}
          aria-describedby={`${id}-description`}
          name={id}
          type="checkbox"
          className="focus:ring-transparent focus-visible:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {name}
        </label>
        <p id={`${id}-description`} className="text-sm text-left text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
