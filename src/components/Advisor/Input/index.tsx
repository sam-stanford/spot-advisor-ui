import React from 'react';
import Options from '../../../common/api/schema/Options';
import Service from '../../../common/api/schema/Service';
import AdvisorInfo from '../../../common/types/AdvisorInfo';
import AdvisorInput from './AdvisorInput';
import OptionsInput from './OptionsInput';
import ServicesInput from './ServicesInput';

export default function Input(props: {
  services: Service[];
  addService: (s: Service) => void;
  editService: (name: string, edited: Service) => void;
  removeService: (name: string) => void;

  selectedAdvisor: AdvisorInfo | undefined;
  selectAdvisor: (a: AdvisorInfo) => void;
  clearAdvisorSelection: () => void;

  options: Options;
  setOptions: (o: Options) => void;
}) {
  const {
    services,
    addService,
    editService,
    removeService,
    selectedAdvisor,
    selectAdvisor,
    clearAdvisorSelection,
    options,
    setOptions,
  } = props;

  return (
    <div className="space-y-20 divide-y divide-gray-200">
      <div id="Services">
        <h3 className="text-left my-5 text-xl">Services</h3>
        <ServicesInput
          services={services}
          addService={addService}
          editService={editService}
          removeService={removeService}
        />
      </div>
      <div id="Advisors">
        <h3 className="text-left my-5 text-xl">Advisor</h3>
        <AdvisorInput
          selected={selectedAdvisor}
          select={selectAdvisor}
          clearSelection={clearAdvisorSelection}
        />
      </div>
      <div id="Options">
        <h3 className="text-left my-5 text-xl">Options</h3>
        <OptionsInput options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}
