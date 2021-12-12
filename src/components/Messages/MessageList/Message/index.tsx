import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import MessageType from '../../../../common/types/Message';

// TODO: Display type (likely indirect to other componetns)

export default function Message(props: {
  message: MessageType;
  remove: () => void;
}): JSX.Element {
  const { message, remove } = props;

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            {message.message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-green-50 focus-visible:ring-green-600"
              onClick={remove}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
