import React from 'react';
import PlusCircle from '../../../../../common/icons/outline/PlusCircleIcon';

export default function AddServiceButton(props: {
  onClick: () => void;
}): JSX.Element {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="group relative block w-full border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-400 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition duration-200 py-10"
      onClick={onClick}
    >
      <PlusCircle className="mx-auto text-gray-700 w-12 transition" />
      <span className="mt-2 block text-sm font-medium text-gray-700">
        Add Service
      </span>
    </button>
  );
}
