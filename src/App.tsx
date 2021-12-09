import React from 'react';
import './App.css';
import Header from './components/Header';
import Messages from './components/Messages';
import MessagesProvider from './contexts/Messages/MessagesProvider';
import AdviseForm from './components/AdviseForm';

function App(): JSX.Element {
  return (
    <MessagesProvider>
      <div className="App">
        {/* TODO: Wrap from here in a page */}
        <Header />
        <div className="Page max-w-screen-lg w-11/12 mx-auto">
          <AdviseForm />
        </div>

        <Messages />
      </div>
    </MessagesProvider>
  );
}

export default App;
