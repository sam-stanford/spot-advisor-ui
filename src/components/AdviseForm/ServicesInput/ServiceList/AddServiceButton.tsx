import React from 'react';

export default function AddServiceButton(props: {
  onClick: () => void;
}): JSX.Element {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="group relative block w-full border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto text-gray-700 w-12 transition"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-700">
        Add Service
      </span>
    </button>
  );
}
