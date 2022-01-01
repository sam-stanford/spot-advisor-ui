import React from 'react';
import Assignments from '../../../../common/api/schema/Assignments';
import Instance from '../../../../common/api/schema/Instance';
import Service from '../../../../common/api/schema/Service';
import InstancesToServicesListItem from './InstancesToServicesListItem';

export default function InstancesToServicesList(props: {
  assignments: Assignments; // TODO
  instances: { [id: string]: Instance };
  services: Service[];
}) {
  const { assignments, instances, services } = props;

  const getServicesFromNames = (names: string[]) => {
    return services.filter((s) => names.some((name) => name === s.name));
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 auto-rows-fr">
      {Object.keys(assignments.instancesToServices).map((instanceId) => (
        <InstancesToServicesListItem
          key={instanceId}
          instance={instances[instanceId]}
          services={getServicesFromNames(
            assignments.instancesToServices[instanceId],
          )}
        />
      ))}
    </ul>
  );
}
