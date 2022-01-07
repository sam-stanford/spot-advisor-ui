import React from 'react';
import Assignments from '../../../../common/api/schema/Assignments';
import Instance from '../../../../common/api/schema/Instance';
import Service from '../../../../common/api/schema/Service';
import InstancesToServicesListItem from './InstancesToServicesListItem';

export default function InstancesToServicesList(props: {
  assignments: Assignments;
  instances: { [id: string]: Instance };
  services: Service[];
}) {
  const { assignments, instances, services } = props;

  const getServiceWithName = (name: string): Service => {
    return services.filter((s) => s.name === name)[0];
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 auto-rows-fr">
      {Object.keys(assignments.instancesToServices).map((instanceId) => (
        <InstancesToServicesListItem
          key={instanceId}
          instance={instances[instanceId]}
          services={assignments.instancesToServices[instanceId].map((name) =>
            getServiceWithName(name),
          )}
        />
      ))}
    </ul>
  );
}
