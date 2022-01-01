import React from 'react';
import { Switch as HeadlessUiSwitch } from '@headlessui/react';
import classNames from '../../common/utils/classNames';

export default function Switch(props: {
  label: string;
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
}) {
  const { label, isEnabled, setIsEnabled } = props;

  return (
    <div>
      <p>{label}</p>
      <HeadlessUiSwitch
        checked={isEnabled}
        onChange={setIsEnabled}
        className={classNames(
          isEnabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            isEnabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          )}
        />
      </HeadlessUiSwitch>
    </div>
  );
}
