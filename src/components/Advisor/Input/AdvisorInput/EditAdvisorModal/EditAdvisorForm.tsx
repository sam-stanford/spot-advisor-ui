import React, { useState } from 'react';
import AdvisorInfo from '../../../../../common/advisors/AdvisorInfo';
import { AdvisorWeights } from '../../../../../common/api/schema/Advisor';
import HtmlInputType from '../../../../../common/types/HtmlInputType';
import Input from '../../../../common/forms/Input';

export default function EditAdvisorForm(props: {
  submit: (advisorWeights: AdvisorWeights) => void;
  cancel: () => void;
  advisor: AdvisorInfo;
}) {
  const { submit, cancel, advisor } = props;

  const [values, setValues] = useState<AdvisorWeights>({
    ...advisor.advisor.weights,
  });

  const submitForm = () => {
    // TODO: Validation
    submit(values);
  };

  const isPositiveValidation = {
    isValid: (val: string) => {
      return Number(val) >= 0;
    },
    error: 'Must be a positive value',
  };

  return (
    <form>
      <div className="space-y-8 divide-y divide-gray-200">
        <Input
          name="availability-weight"
          label="Availability Weight"
          validations={[isPositiveValidation]}
          type={HtmlInputType.Number}
          value={values.availability.toString()}
          initialValue={values.availability.toString()}
          setValue={(weight: string) =>
            setValues({ ...values, availability: Number(weight) })
          }
          placeholder="Availability Weight"
        />
        <Input
          name="performance-weight"
          label="Performance Weight"
          validations={[isPositiveValidation]}
          type={HtmlInputType.Number}
          value={values.performance.toString()}
          initialValue={values.performance.toString()}
          setValue={(weight: string) =>
            setValues({ ...values, performance: Number(weight) })
          }
          placeholder="Performance Weight"
        />
        <Input
          name="price-weight"
          label="Price Weight"
          validations={[isPositiveValidation]}
          type={HtmlInputType.Number}
          value={values.price.toString()}
          initialValue={values.price.toString()}
          setValue={(weight: string) =>
            setValues({ ...values, price: Number(weight) })
          }
          placeholder="Price Weight"
        />
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={submitForm}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
