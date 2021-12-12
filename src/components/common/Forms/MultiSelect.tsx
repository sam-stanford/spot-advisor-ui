import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';
import React, { Fragment, useState } from 'react';

// TODO: Use this in other conditional classNames
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export type MultiSelectOption = {
  value: string;
  selected: boolean;
};

export default function MultiSelect(props: {
  name: string;
  options: MultiSelectOption[];
  toggleActive: (value: string) => void;
}) {
  const { name, options, toggleActive } = props;
  let closeTimeoutId: ReturnType<typeof global.setTimeout> = setTimeout(
    () => undefined,
  ); // https://reactjs.org/docs/accessibility.html#mouse-and-pointer-events

  const [open, setOpen] = useState(false);

  const closeDropdown = () => {
    closeTimeoutId = setTimeout(() => {
      setOpen(false);
    });
  };

  const selectedOptions = options.filter((o) => o.selected).map((o) => o.value);

  /* TODO: Fix drop down clearning on click */
  /* TODO: Maybe error to do with nested buttons */

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Assigned to
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          onBlur={closeDropdown}
        >
          <span className="block -mb-2">
            {selectedOptions.map((o) => (
              <span
                key={o}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-800 mr-1 mb-2 cursor-pointer"
                role="presentation"
                onClick={() => toggleActive(o)}
                onKeyDown={() => toggleActive(o)}
              >
                {o}
              </span>
            ))}
            {selectedOptions.length === 0 ? (
              <span className="inline-flex px-3 py-0.5 mr-1 mb-2">&zwnj;</span>
            ) : null}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </button>

        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-in duration-100"
          leave="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map(({ value, selected }) => (
              <li
                role="option"
                tabIndex={0}
                aria-selected={selected}
                key={value}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-left block text-gray-900 hover:bg-indigo-50"
                onClick={() => toggleActive(value)}
                onKeyPress={() => toggleActive(value)}
                onFocus={() => {
                  clearTimeout(closeTimeoutId);
                }}
                onBlur={closeDropdown}
              >
                {selected ? (
                  <CheckIcon className="h-4 w-4 mr-1 inline-block text-indigo-600" />
                ) : null}
                <span
                  className={classNames(
                    selected ? 'font-semibold' : 'font-normal ml-5',
                    'truncate',
                  )}
                >
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
}
