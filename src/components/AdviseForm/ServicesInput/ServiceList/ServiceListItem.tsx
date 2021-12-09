import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react';
import Service from '../../../../common/api/schema/Service';

export default function ServiceListItem(props: {
  service: Service;
  editService: () => void;
  removeService: () => void;
}): JSX.Element {
  const { service, editService, removeService } = props;

  return (
    <li
      key={service.name}
      className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {service.name}
            </h3>
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              TODO
            </span>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">TODO</p>
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
