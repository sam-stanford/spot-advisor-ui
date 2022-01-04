import React, { useState } from 'react';
import Service from '../../../../../common/api/schema/Service';
import HtmlInputType from '../../../../../common/types/HtmlInputType';
import Validation, {
  isIntegerValidation,
  isPositiveValidation,
  requiredValidation,
} from '../../../../../common/types/Validation';
import Input from '../../../../common/forms/Input';

export default function ServiceInputForm(props: {
  submit: (service: Service) => void;
  cancel: () => void;
  currentServiceNames: string[];
  initialValues?: Partial<Service>;
  submitButtonText: string;
  cancelButtonText: string;
  title: string;
}) {
  const {
    submit,
    cancel,
    currentServiceNames,
    initialValues,
    submitButtonText,
    cancelButtonText,
    title,
  } = props;

  const [values, setValues] = useState<Partial<Service>>({ ...initialValues });
  const [errorMessages, setErrorMessages] = useState<{
    [key in keyof Service]: string;
  }>({
    name: '',
    minMemory: '',
    maxVcpu: '',
    minInstances: '',
    maxInstances: '',
  });

  const validations: { [key in keyof Service]: Validation[] } = {
    name: [
      requiredValidation,
      {
        isValid: (val: string) =>
          val === initialValues?.name ||
          !currentServiceNames.some((name: string) => val === name),
        error: 'A service already exists with this name',
      },
    ],
    minMemory: [requiredValidation, isPositiveValidation],
    maxVcpu: [requiredValidation, isPositiveValidation, isIntegerValidation],
    minInstances: [
      requiredValidation,
      isPositiveValidation,
      isIntegerValidation,
      {
        isValid: (value: string) => {
          if (values.maxInstances) {
            return Number(value) <= values.maxInstances;
          }
          return true;
        },
        error: 'Cannot be greater than maximum number of instances',
      },
    ],
    maxInstances: [
      requiredValidation,
      isPositiveValidation,
      isIntegerValidation,
    ],
  };

  const setFieldErrorMessage = (field: keyof Service, error: string) => {
    const newErrorMessages = {
      ...errorMessages,
    };
    newErrorMessages[field] = error;
    setErrorMessages(newErrorMessages);
  };

  const validateField = (field: keyof Service): boolean => {
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
    const fields = Object.keys(validations).reverse(); // Validate first field first
    fields.forEach((field) => {
      const fieldIsValid = validateField(field as keyof Service);
      isValid = isValid && fieldIsValid;
    });
    return isValid;
  };

  const submitForm = () => {
    const isValid = validateAllFields();
    if (isValid) {
      submit(values as Service);
    }
  };

  return (
    <form>
      <div className="bg-white border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 pb-2">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        <Input
          name="name"
          label="Service Name"
          description="What should the service be called?"
          placeholder="Service Name"
          validate={() => validateField('name')}
          errorMessage={errorMessages.name}
          type={HtmlInputType.Text}
          value={values.name !== undefined ? values.name : ''}
          setValue={(name: string) => setValues({ ...values, name })}
        />
        <Input
          name="min-memory"
          label="Minimum Memory (GiB)"
          description="How much memory does the service required?"
          type={HtmlInputType.Number}
          value={values.minMemory !== undefined ? `${values.minMemory}` : ''}
          setValue={(minMemory: string) =>
            setValues({ ...values, minMemory: Number(minMemory) })
          }
          placeholder="Min Memory"
          errorMessage={errorMessages.minMemory}
          validate={() => validateField('minMemory')}
        />
        <Input
          name="max-vcpu"
          label="Maximum Number of Cores"
          description="How many CPU cores can the service make use of?"
          type={HtmlInputType.Number}
          value={values.maxVcpu !== undefined ? `${values.maxVcpu}` : ''}
          setValue={(maxVcpu: string) =>
            setValues({ ...values, maxVcpu: Number(maxVcpu) })
          }
          placeholder="Max Cores"
          errorMessage={errorMessages.maxVcpu}
          validate={() => validateField('maxVcpu')}
        />
        <Input
          name="min-instances"
          label="Minimum Number of Instances"
          description="How many instances of the services should always be running?"
          type={HtmlInputType.Number}
          value={
            values.minInstances !== undefined ? `${values.minInstances}` : ''
          }
          setValue={(minInstances: string) =>
            setValues({ ...values, minInstances: Number(minInstances) })
          }
          placeholder="Min Instances"
          errorMessage={errorMessages.minInstances}
          validate={() => validateField('minInstances')}
        />
        <Input
          name="max-instances"
          label="Maximum Number of Instances"
          description="How many instances of the service are preferred to be running?"
          type={HtmlInputType.Number}
          value={
            values.maxInstances !== undefined ? `${values.maxInstances}` : ''
          }
          setValue={(maxInstances: string) =>
            setValues({ ...values, maxInstances: Number(maxInstances) })
          }
          placeholder="Max Instances"
          errorMessage={errorMessages.maxInstances}
          validate={() => validateField('maxInstances')}
        />
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={submitForm}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {submitButtonText}
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={cancel}
        >
          {cancelButtonText}
        </button>
      </div>
    </form>
  );
}
