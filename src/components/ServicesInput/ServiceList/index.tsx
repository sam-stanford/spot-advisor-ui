import React from 'react';
import Service from '../../../common/api/schema/Service';
import AddServiceButton from './AddServiceButton';
import ServiceListItem from './ServiceListItem';

export default function ServiceList(props: {
  services: Service[];
  addService: () => void;
  editService: (name: string) => void;
  removeService: (name: string) => void;
}): JSX.Element {
  const { services, addService, editService, removeService } = props;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceListItem
          key={service.name}
          service={service}
          editService={() => editService(service.name)}
          removeService={() => removeService(service.name)}
        />
      ))}
      <AddServiceButton onClick={addService} />
    </ul>
  );
}
