import React, { useState } from 'react';
import classNames from '../../common/utils/classNames';
import LoadingSpinner from '../common/LoadingSpinner';

export default function SubmitButton(props: {
  submit: () => void;
  isLoading: boolean;
}) {
  const { submit, isLoading } = props;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={submit}
        className={classNames(
          'mt-8 px-8 py-4 w-20 inline-flex justify-center rounded-md border border-transparent shadow-sm font-medium text-base sm:ml-3 sm:w-auto sm:text-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500',
          isLoading
            ? 'bg-indigo-100 cursor-not-allowed text-indigo-400'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white',
        )}
        aria-busy={isLoading ? 'true' : 'false'}
      >
        {isLoading ? <LoadingSpinner text="Loading..." /> : <>Get Instances</>}
      </button>
    </div>
  );
}
