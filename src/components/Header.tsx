import React from 'react';

export default function Header(): JSX.Element {
  return (
    <header className="max-w-7xl mx-auto shadow hidden md:flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10 mb-16 z-40 ">
      <div className="md:flex-1 md:flex md:items-center md:justify-between">
        <nav className="flex space-x-10">
          <a href="localhost:3000">TEST 1</a>
          <a href="localhost:3000">TEST 2</a>
        </nav>
      </div>
    </header>
  );
}
