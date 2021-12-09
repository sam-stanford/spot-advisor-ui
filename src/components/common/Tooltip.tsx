import React from 'react';

export default function Tooltip(props: {
  text: string;
  children: React.ReactElement;
}) {
  const { text, children } = props;

  // TODO
  return (
    <span className="group relative">
      {children}
      <div className="absolute opacity-0 group-hover:opacity-100">{text}</div>
    </span>
  );
}
