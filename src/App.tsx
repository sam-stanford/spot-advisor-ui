import React from 'react';
import './App.css';
import Header from './components/Header';
import Messages from './components/Messages';
import MessagesProvider from './contexts/Messages/MessagesProvider';
import Advisor from './components/Advisor';

function App(): JSX.Element {
  return (
    <MessagesProvider>
      <div className="App">
        {/* TODO: Wrap from here in a page */}
        <Header />
        <div className="Page max-w-screen-lg w-11/12 mx-auto">
          <Advisor />
        </div>

        <div className="pb-96" />
        <div className="pb-96" />

        <Messages />
      </div>
    </MessagesProvider>
  );
}

export default App;
