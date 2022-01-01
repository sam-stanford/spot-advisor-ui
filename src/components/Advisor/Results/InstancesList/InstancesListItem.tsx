import React from 'react';
import Instance from '../../../../common/api/schema/Instance';

export default function InstancesListItem(props: { instance: Instance }) {
  const { instance } = props;

  const details: {
    key: string;
    label: string;
    value: number | string;
    unit: string;
    unitBeforeValue: boolean;
  }[] = [
    {
      key: 'memory',
      label: 'Memory',
      value: instance.memory,
      unit: 'GiB',
      unitBeforeValue: false,
    },
    {
      key: 'vcpu',
      label: 'Cores',
      value: instance.vcpu,
      unit: '',
      unitBeforeValue: false,
    },
    {
      key: 'price',
      label: 'Price per Hour',
      value: instance.price,
      unit: '$',
      unitBeforeValue: true,
    },
    {
      key: 'os',
      label: 'Operating System',
      value: instance.os,
      unit: '',
      unitBeforeValue: false,
    },
    {
      key: 'rp',
      label: 'Revocation Probability',
      value: instance.revocProb,
      unit: '',
      unitBeforeValue: false,
    },
  ];

  if (instance.az !== 'N/A' && instance.az !== 'NA') {
    details.push({
      key: 'az',
      label: 'Availability Zone',
      value: instance.az,
      unit: '',
      unitBeforeValue: false,
    });
  }

  return (
    <li
      key={instance.name}
      className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {instance.name}
            </h3>
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              TODO
            </span>
          </div>
          <ul className="text-left">
            {details.map((d) => (
              <li key={d.key} className="mt-1 text-gray-500 text-sm truncate">
                {d.label}: {d.unitBeforeValue ? `${d.unit} ` : ''}
                {d.value}
                {d.unitBeforeValue ? '' : ` ${d.unit}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
