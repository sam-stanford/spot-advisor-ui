import React, { useEffect, useState } from 'react';
import Service from '../../common/api/schema/Service';
import { MessageType } from '../../common/types/Message';
import useMessages from '../../hooks/useMessages';
import ServicesInput from './ServicesInput';

const testServices: Service[] = [
  {
    name: 'Test 1',
    minMemory: 0.4,
    maxInstances: 2,
    minInstances: 1,
    maxVcpu: 8,
  },
  {
    name: 'Test 2',
    minMemory: 0.6,
    maxInstances: 2,
    minInstances: 1,
    maxVcpu: 8,
  },
];

export default function AdviseForm(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);

  // TODO: Remove & fetch instead
  useEffect(() => {
    setServices(testServices);
  }, []);

  const { newMessage } = useMessages();

  const serviceExistsWithName = (name: string): boolean => {
    return services.some((s) => s.name === name);
  };

  const addService = (s: Service) => {
    if (serviceExistsWithName(s.name)) {
      newMessage({
        message: `service with name "${s.name}" already exists`,
        type: MessageType.ERROR,
      });
      return;
    }
    setServices([...services, s]);
  };

  const editService = (name: string, edited: Service) => {
    const serviceIndex = services.findIndex((s) => s.name === name);
    if (serviceIndex === -1) {
      newMessage({
        message: `service with name "${edited.name}" already exists`,
        type: MessageType.ERROR,
      });
      return;
    }
    setServices([
      ...services.slice(0, serviceIndex),
      edited,
      ...services.slice(serviceIndex + 1),
    ]);
  };

  const removeService = (serviceName: string) => {
    setServices(services.filter((s) => s.name !== serviceName));
  };

  return (
    <ServicesInput
      services={services}
      addService={addService}
      editService={editService}
      removeService={removeService}
    />
  );
}
