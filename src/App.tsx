import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import ServicesInput from './components/ServicesInput';
import Service from './common/api/schema/Service';
import Messages from './components/Messages/index.';
import MessagesProvider from './contexts/Messages/MessagesProvider';

function App(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);

  const addService = (s: Service) => {
    setServices([...services, s]);
  };

  const editService = (name: string, edited: Service) => {
    const serviceIndex = services.findIndex((s) => s.name === name);
    setServices([
      ...services.slice(0, serviceIndex),
      edited,
      ...services.slice(serviceIndex + 1),
    ]);
  };

  const removeService = (serviceName: string) => {
    setServices(services.filter((s) => s.name !== serviceName));
  };

  // TODO: Use
  const serviceExistsWithName = (name: string): boolean => {
    return services.some((s) => s.name === name);
  };

  return (
    <MessagesProvider>
      <div className="App">
        {/* TODO: Wrap from here in a page */}
        <Header />
        <div className="Page max-w-screen-lg w-11/12 mx-auto">
          <ServicesInput
            services={services}
            addService={addService}
            editService={editService}
            removeService={removeService}
          />
        </div>
        <Messages />
      </div>
    </MessagesProvider>
  );
}

export default App;
