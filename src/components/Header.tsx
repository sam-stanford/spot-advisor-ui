import React from 'react';

export default function Header(): JSX.Element {
  return (
    <header className="mx-auto shadow hidden md:block">
      <div className="max-w-screen-lg w-11/12 flex justify-between items-center mx-auto sm:py-4 md:space-x-10 mb-16 z-40 py-5">
        <a href="/">
          <h3 className="font-semibold">Instance Advisor</h3>
        </a>
        <nav className="flex space-x-10">
          <a href="/about">About</a>
          <a href="/help">Help</a>
        </nav>
      </div>
    </header>
  );
}
