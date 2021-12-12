import React, { useEffect, useState } from 'react';
import Service from '../../common/api/schema/Service';
import { MessageType } from '../../common/types/Message';
import useMessages from '../../hooks/useMessages';
import AdvisorInput from './Input/AdvisorInput';
import OptionsInput from './Input/OptionsInput';
import ServicesInput from './Input/ServicesInput';
import Options from '../../common/api/schema/Options';
import DefaultOptions from '../../common/options/DefaultOptions';
import getInstances from '../../common/api/getInstances';
import AdvisorInfo from '../../common/advisors/AdvisorInfo';

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

export default function Advisor(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [options, setOptions] = useState<Options>(DefaultOptions);
  const [advisor, setAdvisor] = useState<AdvisorInfo | undefined>();

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
        type: MessageType.Error,
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
        type: MessageType.Error,
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
    <div className="space-y-8 divide-y divide-gray-200">
      <div>
        <h3 className="text-left my-5 text-xl">Services</h3>
        <ServicesInput
          services={services}
          addService={addService}
          editService={editService}
          removeService={removeService}
        />
      </div>
      <div>
        <h3 className="text-left my-5 text-xl">Advisor</h3>
        <AdvisorInput
          selected={advisor}
          select={setAdvisor}
          clearSelection={() => setAdvisor(undefined)}
        />
      </div>
      <div>
        <h3 className="text-left my-5 text-xl">Options</h3>
        <OptionsInput options={options} setOptions={setOptions} />
      </div>
      <button
        type="button"
        onClick={() => {
          if (advisor === undefined) {
            throw new Error('no advisor selected');
          }
          getInstances({
            s: services,
            a: advisor?.advisor,
            o: options,
          });
        }}
        className="mt-8 px-8 py-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
      >
        Get Instances
      </button>
    </div>
  );
}
