import React from 'react';
import Instance from '../../../../common/api/schema/Instance';
import InstancesListItem from './InstancesListItem';

export default function InstanceList(props: { instances: Instance[] }) {
  const { instances } = props;
  return (
    <>
      <h3 className="text-left">Instances</h3>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {instances.map((instance) => (
          <InstancesListItem key={instance.id} instance={instance} />
        ))}
      </ul>
    </>
  );
}
