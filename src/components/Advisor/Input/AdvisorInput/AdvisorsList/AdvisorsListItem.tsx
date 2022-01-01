import {
  AdjustmentsIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@heroicons/react/outline';
import React from 'react';
import AdvisorInfo from '../../../../../common/advisors/AdvisorInfo';
import { AdvisorWeights } from '../../../../../common/api/schema/Advisor';

export default function AdvisorsListItem(props: {
  advisorInfo: AdvisorInfo;
  isSelected: boolean;
  toggleSelected: () => void;
  edit: () => void;
}) {
  const { advisorInfo, isSelected, toggleSelected, edit } = props;

  const weightsToFeature = (weights: AdvisorWeights): string => {
    return `Availability weight: ${weights.availability}, performance weight: ${weights.performance}, price weight: ${weights.price}`;
  };

  const features = advisorInfo.isConfigurable
    ? [...advisorInfo.features, weightsToFeature(advisorInfo.advisor.weights)]
    : advisorInfo.features;

  const selectedClasses =
    'border-gray-300 bg-white text-gray-700 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500';
  const unselectedClasses =
    'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500';

  return (
    <div
      key={advisorInfo.advisor.type}
      className="border border-gray-200 rounded-lg shadow"
    >
      {/* TODO: Info icon top right for non-configurable */}
      <div className="p-6">
        <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full bg-indigo-50">
          <advisorInfo.icon className="h-12 w-12 text-indigo-500" />
        </div>
        <h2 className="mt-6 text-lg leading-6 font-medium text-gray-900">
          {advisorInfo.title}
        </h2>
        <ul className="mt-6 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center space-x-3 text-left">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-indigo-500"
                aria-hidden="true"
              />
              <span className="text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col mt-8">
          {advisorInfo.isConfigurable ? (
            <button
              type="button"
              onClick={edit}
              className="mx-auto mb-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm border-gray-300 bg-white text-gray-700 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              <AdjustmentsIcon className="h-4 w-4 mr-1" />
              Configure
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggleSelected}
            className={`mx-auto w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 text-base font-medium sm:w-auto sm:text-sm ${
              isSelected ? selectedClasses : unselectedClasses
            }
          `}
          >
            {isSelected ? (
              <>
                <CheckIcon className="h-4 w-4 mr-1 mt-0.5" />
                Selected
              </>
            ) : (
              'Select'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
