import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../../common/api/schema/Service';
import { MessageType } from '../../common/types/Message';
import useMessages from '../../hooks/useMessages';
import Options from '../../common/api/schema/Options';
import DefaultOptions from '../../common/options/DefaultOptions';
import AdvisorInfo from '../../common/types/AdvisorInfo';
import Advice from '../../common/api/schema/Advice';

import Results from './Results';
import Input from './Input';
import scrollToElement from '../../common/utils/scrollToElement';
import useApi from '../../hooks/useApi';
import SubmitButton from './SubmitButton';
import useConsole from '../../hooks/useConsole';

export default function Advisor(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [options, setOptions] = useState<Options>(DefaultOptions);
  const [advisor, setAdvisor] = useState<AdvisorInfo | undefined>();
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { newMessage } = useMessages();
  const { postAdvise } = useApi();
  const { Console } = useConsole();
  const navigate = useNavigate();

  const validateAndSubmit = () => {
    if (services.length === 0) {
      newMessage('Please add one or more services', MessageType.Error);
      navigate('#Services');
      scrollToElement('Services');
      return;
    }
    if (advisor === undefined) {
      newMessage('Please select an advisor', MessageType.Error);
      navigate('#Advisors');
      scrollToElement('Advisors');
      return;
    }
    if (options.regions.length === 0) {
      newMessage('Please select one or more regions', MessageType.Error);
      navigate('#Options');
      scrollToElement('Options');
      return;
    }

    setIsLoading(true);
    postAdvise({
      services,
      advisor: advisor.advisor,
      options,
    })
      .then((resp) => {
        setAdvice(resp);
      })
      .catch((error) => {
        Console.log('Error making advise request', error);
        newMessage(
          `An error occured when making the request, please try again later`,
          MessageType.Error,
          5000,
        );
      });
    setIsLoading(false);
  };

  const serviceExistsWithName = (name: string): boolean =>
    services.some((s) => s.name === name);

  const addService = (s: Service) => {
    if (serviceExistsWithName(s.name)) {
      newMessage(
        `Service with name "${s.name}" already exists`,
        MessageType.Error,
      );
      return;
    }
    setServices([...services, s]);
    newMessage(`Service "${s.name}" added`, MessageType.Success);
  };

  const editService = (name: string, edited: Service) => {
    const serviceIndex = services.findIndex((s) => s.name === name);
    if (serviceIndex === -1) {
      newMessage(`Service with "${name}" does not exist`, MessageType.Error);
      return;
    }
    if (edited.name !== name && serviceExistsWithName(edited.name)) {
      newMessage(
        `Service with name "${edited.name}" already exists`,
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
    <div className="pb-16">
      <Input
        services={services}
        addService={addService}
        editService={editService}
        removeService={removeService}
        selectedAdvisor={advisor}
        selectAdvisor={setAdvisor}
        clearAdvisorSelection={() => {
          setAdvisor(undefined);
        }}
        options={options}
        setOptions={setOptions}
      />
      <SubmitButton submit={validateAndSubmit} isLoading={isLoading} />
      {advice !== null ? <Results advice={advice} services={services} /> : null}
    </div>
  );
}
