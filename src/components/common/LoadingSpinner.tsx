import React from 'react';

export default function LoadingSpinner(props: { text: string }) {
  const { text } = props;
  return (
    <div className="flex justify-start items-center">
      <span
        style={{ borderTopColor: 'transparent' }}
        className="w-6 h-6 border-2 border-indigo-400 border-solid rounded-full animate-spin"
        role="status"
      />
      <span className="text-left ml-2">{text}</span>
    </div>
  );
}
