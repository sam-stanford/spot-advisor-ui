import { XIcon } from '@heroicons/react/outline';
import React from 'react';

export default function ModalCloseButton(props: {
  onClick: () => void;
}): JSX.Element {
  const { onClick } = props;

  return (
    <div className="hidden sm:block absolute top-0 right-0 pt-6 pr-6">
      <button
        type="button"
        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        onClick={onClick}
      >
        <span className="sr-only">Close</span>
        <XIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
