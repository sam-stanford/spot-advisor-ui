import { ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { AdvisorWeights } from '../../../../common/api/schema/Advisor';
import AdvisorInfo from '../../../../common/types/AdvisorInfo';
import Modal from '../../../common/Modal';

export default function ViewAdvisorModal(props: {
  isOpen: boolean;
  close: () => void;
  advisor: AdvisorInfo;
}) {
  const { isOpen, close, advisor } = props;

  const weightsToFeatures = (weights: AdvisorWeights): string[] => {
    return [
      `Availability weight: ${weights.availability}`,
      `Performance weight: ${weights.performance}`,
      `Price weight: ${weights.price}`,
    ];
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div>
        <div className="bg-white border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 pb-2">
            {advisor.title}
          </h3>
        </div>
        <ul className="mt-6 space-y-4">
          {[
            ...advisor.features,
            ...weightsToFeatures(advisor.advisor.weights),
          ].map((feature) => (
            <li key={feature} className="flex items-center space-x-3 text-left">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-indigo-500"
                aria-hidden="true"
              />
              <span className="text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
