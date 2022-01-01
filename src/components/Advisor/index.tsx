import React, { useEffect, useState } from 'react';
import Service from '../../common/api/schema/Service';
import { MessageType } from '../../common/types/Message';
import useMessages from '../../hooks/useMessages';
import AdvisorInput from './input/AdvisorInput';
import OptionsInput from './input/OptionsInput';
import ServicesInput from './input/ServicesInput';
import Options from '../../common/api/schema/Options';
import DefaultOptions from '../../common/options/DefaultOptions';
import AdvisorInfo from '../../common/advisors/AdvisorInfo';
import postAdvise from '../../common/api/requests/postAdvise';
import ApiConfig from '../../common/api/config';
import Advice from '../../common/api/schema/Advice';
import Results from './Results';

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
  const [advice, setAdvice] = useState<Advice | null>(null);

  // TODO: Remove & fetch instead
  useEffect(() => {
    setServices(testServices);
  }, []);

  const { newMessage } = useMessages();

  const validateAndSubmit = () => {
    if (services.length === 0) {
      newMessage('Please add one or more services', MessageType.Error);
      // TODO: Scroll to services
      return;
    }
    if (advisor === undefined) {
      newMessage('Please select an advisor', MessageType.Error);
      return;
      // TODO: Scroll to advisors
    }
    if (options.regions.length === 0) {
      // TODO: Abstract to "validateOptions"
      newMessage('Please select one or more regions', MessageType.Error);
      // TODO: Scroll to options
      return;
    }

    const config = new ApiConfig({
      baseUrl: 'http://127.0.0.1:12021',
      advisePath: '/advise',
      regionsPath: '/regions',
    });

    // TODO
    postAdvise(
      // TODO: Rename
      {
        services,
        advisor: advisor.advisor,
        options,
      },
      config,
    )
      .then((resp) => {
        setAdvice(resp); // TODO: Rename resp
      })
      .catch((error) => {
        console.error(error); // TODo: Handle better
      });
  };

  const serviceExistsWithName = (name: string): boolean => {
    return services.some((s) => s.name === name);
  };

  const addService = (s: Service) => {
    if (serviceExistsWithName(s.name)) {
      newMessage(
        `Service with name "${s.name}" already exists`,
        MessageType.Error,
      );
      return;
    }
    setServices([...services, s]);
  };

  const editService = (name: string, edited: Service) => {
    const serviceIndex = services.findIndex((s) => s.name === name);
    if (serviceIndex === -1) {
      newMessage(
        `service with name "${edited.name}" already exists`,
        MessageType.Error,
      );
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
    // TODO: Wrap in Input component
    <>
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
          onClick={validateAndSubmit}
          className="mt-8 px-8 py-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm font-medium text-base sm:ml-3 sm:w-auto sm:text-md bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        >
          Get Instances
        </button>
      </div>
      {/* TODO: Loading spinner */}
      {advice !== null ? <Results advice={advice} services={services} /> : ''}
    </>
  );
}
