import React, { useMemo } from 'react';
import Instance from '../../../../common/api/schema/Instance';
import Service from '../../../../common/api/schema/Service';

export default function InstancesToServicesListItem(props: {
  instance: Instance;
  services: Service[];
}) {
  const { instance, services } = props;

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
      key: 'rp',
      label: 'Revocation Probability',
      value: instance.revocProb,
      unit: '',
      unitBeforeValue: false,
    },
    {
      key: 'os',
      label: 'Operating System',
      value: instance.os === 'NA' ? 'Any' : instance.os,
      unit: '',
      unitBeforeValue: false,
    },
    {
      key: 'az',
      label: 'Availability Zone',
      value: instance.az === 'NA' ? 'Any' : instance.az,
      unit: '',
      unitBeforeValue: false,
    },
  ];

  const servicesAndCounts: { name: string; count: number }[] = useMemo(() => {
    const nameToCountsMap: { [name: string]: { name: string; count: number } } =
      {};
    services.forEach((s) => {
      if (s.name in nameToCountsMap) {
        nameToCountsMap[s.name] = {
          ...nameToCountsMap[s.name],
          count: nameToCountsMap[s.name].count + 1,
        };
      } else {
        nameToCountsMap[s.name] = {
          name: s.name,
          count: 1,
        };
      }
    });
    return Object.values(nameToCountsMap);
  }, [services]);

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 font-medium truncate">
              {instance.name}
            </h3>
          </div>
          <h5 className="text-left text-sm mt-3">Specification</h5>
          <ul className="text-left">
            {details.map((d) => (
              <li key={d.key} className="mt-1 text-gray-500 text-sm truncate">
                &bull; {d.label}: {d.unitBeforeValue ? `${d.unit} ` : ''}
                {d.value}
                {d.unitBeforeValue ? '' : ` ${d.unit}`}
              </li>
            ))}
          </ul>
          <h5 className="text-left text-sm mt-3">Services</h5>
          <ul className="text-left">
            {servicesAndCounts.map((serviceAndCount) => (
              <li
                key={serviceAndCount.name}
                className="mt-1 text-gray-500 text-sm truncate"
              >
                &bull; {serviceAndCount.name}
                {serviceAndCount.count > 1 ? (
                  <> (&times;{serviceAndCount.count})</>
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
