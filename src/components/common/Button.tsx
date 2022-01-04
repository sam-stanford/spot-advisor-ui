import React from 'react';

export default function Button(props: {
  children?: React.ReactElement;
  paddingX: number;
  paddingY: number;
  onClick: () => void;
}) {
  const { children, paddingX, paddingY, onClick } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-${paddingY} px-${paddingX} mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm`}
    >
      {children}
    </button>
  );
}
