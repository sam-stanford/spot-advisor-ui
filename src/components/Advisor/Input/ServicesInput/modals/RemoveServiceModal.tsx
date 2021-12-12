import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import React from 'react';
import Modal from '../../../../common/Modal';

export default function RemoveServiceModal(props: {
  isOpen: boolean;
  close: () => void;
  serviceToRemove: string;
  removeService: () => void;
}): JSX.Element {
  const { isOpen: open, close, serviceToRemove, removeService } = props;

  return (
    <Modal
      isOpen={open}
      close={close}
      Content={
        <>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Deactivate account
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {`Are you sure you want to delete ${serviceToRemove}? This action cannot be undone.`}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={removeService}
            >
              Deactivate
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </>
      }
    />
  );
}
