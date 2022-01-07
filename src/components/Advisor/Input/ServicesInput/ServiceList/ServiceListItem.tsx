import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react';
import Service from '../../../../../common/api/schema/Service';

export default function ServiceListItem(props: {
  service: Service;
  editService: () => void;
  removeService: () => void;
}): JSX.Element {
  const { service, editService, removeService } = props;

  const details: { key: string; label: string; value: number; unit: string }[] =
    [
      {
        key: 'minMem',
        label: 'Minimum Memory',
        value: service.minMemory,
        unit: 'GiB',
      },
      {
        key: 'maxVcpu',
        label: 'Maximum Cores',
        value: service.maxVcpu,
        unit: '',
      },
      {
        key: 'minInstances',
        label: 'Minimum Instances',
        value: service.minInstances,
        unit: '',
      },
      {
        key: 'maxInstances',
        label: 'Maximum Instances',
        value: service.maxInstances,
        unit: '',
      },
    ];

  return (
    <li
      key={service.name}
      className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-md font-medium truncate">
              {service.name}
            </h3>
          </div>
          <ul className="text-left">
            {details.map((d) => (
              <li key={d.key} className="mt-1 text-gray-500 text-sm truncate">
                &bull; {d.label}: {d.value}
                {d.unit !== '' ? ` ${d.unit}` : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <button
              type="button"
              onClick={editService}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <PencilIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="ml-3">Edit</span>
            </button>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              type="button"
              onClick={removeService}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
