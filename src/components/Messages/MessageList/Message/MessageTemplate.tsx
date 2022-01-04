import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React, { Fragment, useEffect, useState } from 'react';
import MessageInput from '../../../../common/types/Message';

export default function MessageTemplate(props: {
  message: MessageInput;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  remove: () => void;
  colorString: string;
}) {
  const { message, Icon, remove, colorString } = props;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const removeAnimated = () => {
    setShow(false);
    setTimeout(remove, 200);
  };

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition ease-in duration-100"
      leave="transition ease-in duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="text-right">
        <div
          className={`rounded-md bg-${colorString}-50 p-4 inline-block shadow-md mb-2`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <Icon
                className={`h-5 w-5 text-${colorString}-400`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${colorString}-800`}>
                {message.message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className={`inline-flex bg-${colorString}-50 rounded-md p-1.5 text-${colorString}-500 hover:bg-${colorString}-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-${colorString}-50 focus-visible:ring-${colorString}-600`}
                  onClick={removeAnimated}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
