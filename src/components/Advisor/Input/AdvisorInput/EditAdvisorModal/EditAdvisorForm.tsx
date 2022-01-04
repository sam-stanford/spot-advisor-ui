import React, { useState } from 'react';
import AdvisorInfo from '../../../../../common/types/AdvisorInfo';
import { AdvisorWeights } from '../../../../../common/api/schema/Advisor';
import HtmlInputType from '../../../../../common/types/HtmlInputType';
import Input from '../../../../common/forms/Input';
import Validation, {
  isPositiveValidation,
  requiredValidation,
} from '../../../../../common/types/Validation';

export default function EditAdvisorForm(props: {
  submit: (advisorWeights: AdvisorWeights) => void;
  cancel: () => void;
  advisor: AdvisorInfo;
}) {
  const { submit, cancel, advisor } = props;

  const [values, setValues] = useState<AdvisorWeights>({
    ...advisor.advisor.weights,
  });
  const [errorMessages, setErrorMessages] = useState<{
    [key in keyof AdvisorWeights]: string;
  }>({
    availability: '',
    performance: '',
    price: '',
  });

  const validations: { [key in keyof AdvisorWeights]: Validation[] } = {
    availability: [requiredValidation, isPositiveValidation],
    performance: [requiredValidation, isPositiveValidation],
    price: [requiredValidation, isPositiveValidation],
  };

  const setFieldErrorMessage = (field: keyof AdvisorWeights, error: string) => {
    const newErrorMessages = {
      ...errorMessages,
    };
    newErrorMessages[field] = error;
    setErrorMessages(newErrorMessages);
  };

  const validateField = (field: keyof AdvisorWeights): boolean => {
    const fieldValue = `${values[field]}`;
    let isValid = true;

    validations[field]?.reverse(); // First declared validation message should show first
    validations[field]?.forEach((v) => {
      if (!v.isValid(fieldValue)) {
        setFieldErrorMessage(field, v.error);
        isValid = false;
      }
    });
    validations[field]?.reverse(); // Restore original ordering
    if (isValid) {
      setFieldErrorMessage(field, '');
    }

    return isValid;
  };

  const validateAllFields = (): boolean => {
    let isValid = true;
    Object.keys(values).forEach((field) => {
      const fieldIsValid = validateField(field as keyof AdvisorWeights);
      isValid = isValid && fieldIsValid;
    });
    return isValid;
  };

  const submitForm = () => {
    const isValid = validateAllFields();
    if (isValid) {
      submit(values);
    }
  };

  return (
    <form>
      <div className="bg-white border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 pb-2">
          Configure Advisor: {advisor.title}
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        <Input
          name="availability-weight"
          label="Availability Weight"
          type={HtmlInputType.Number}
          value={
            values.availability !== undefined ? `${values.availability}` : ''
          }
          setValue={(weight: string) =>
            setValues({ ...values, availability: Number(weight) })
          }
          placeholder="Availability Weight"
          errorMessage={errorMessages.availability}
          validate={() => validateField('availability')}
        />
        <Input
          name="performance-weight"
          label="Performance Weight"
          type={HtmlInputType.Number}
          value={
            values.performance !== undefined ? `${values.performance}` : ''
          }
          setValue={(weight: string) =>
            setValues({ ...values, performance: Number(weight) })
          }
          placeholder="Performance Weight"
          errorMessage={errorMessages.performance}
          validate={() => validateField('performance')}
        />
        <Input
          name="price-weight"
          label="Price Weight"
          type={HtmlInputType.Number}
          value={values.price !== undefined ? `${values.price}` : ''}
          setValue={(weight: string) =>
            setValues({ ...values, price: Number(weight) })
          }
          placeholder="Price Weight"
          errorMessage={errorMessages.price}
          validate={() => validateField('price')}
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
