import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Messages from './components/Messages';
import MessagesProvider from './contexts/Messages/MessagesProvider';
import IndexPage from './pages/IndexPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import ApiProvider from './contexts/Api/ApiProvider';
import ApiConfig from './common/api/config';
import ConsoleProvider from './contexts/Console/ConsoleProvider';

export default function App(): JSX.Element {
  const apiConfig = new ApiConfig({
    baseUrl: 'http://127.0.0.1:12021',
    advisePath: '/advise',
    regionsPath: '/regions',
  });

  return (
    <div id="App">
      <ConsoleProvider>
        <MessagesProvider>
          <ApiProvider config={apiConfig}>
            <Header />
            <Router>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Router>
            <Messages />
          </ApiProvider>
        </MessagesProvider>
      </ConsoleProvider>
    </div>
  );
}
