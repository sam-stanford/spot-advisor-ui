import React, { useState } from 'react';
import Service from '../../../../../common/api/schema/Service';
import HtmlInputType from '../../../../../common/types/HtmlInputType';
import Input from '../../../../common/forms/Input';

// TODO: Tooltips
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
    title, // TODO
  } = props;

  const [values, setValues] = useState<Partial<Service>>({ ...initialValues });

  const submitForm = () => {
    // TODO: Validation
    submit(values as Service);
  };

  const isPositiveValidation = {
    isValid: (val: string) => {
      return Number(val) >= 0;
    },
    error: 'Must be a positive value',
  };

  const isIntegerValidation = {
    isValid: (val: string) => {
      return Number.isInteger(Number(val));
    },
    error: 'Must be an integer',
  };

  return (
    <form>
      <div className="space-y-8 divide-y divide-gray-200">
        <Input
          name="name"
          label="Service Name"
          placeholder="Service Name"
          validations={[
            {
              isValid: (val: string) => {
                return currentServiceNames.some((name: string) => val !== name);
              },
              error: 'A service already exists with this name',
            },
            {
              isValid: (val: string) => {
                return (val as string).length !== 0;
              },
              error: 'Must contain at least one character',
            },
          ]}
          type={HtmlInputType.Text}
          value={values.name ? values.name : ''}
          initialValue={values.name}
          setValue={(name: string) => setValues({ ...values, name })}
        />
        <Input
          name="min-memory"
          label="Minimum Memory (GiB)"
          validations={[isPositiveValidation]}
          type={HtmlInputType.Number}
          value={values.minMemory ? `${values.minMemory}` : ''}
          initialValue={`${values.minMemory}`}
          setValue={(minMemory: string) =>
            setValues({ ...values, minMemory: Number(minMemory) })
          }
          placeholder="Min Memory"
        />
        <Input
          name="max-vcpu"
          label="Maximum Number of Cores"
          validations={[isPositiveValidation, isIntegerValidation]}
          type={HtmlInputType.Number}
          value={values.maxVcpu ? `${values.maxVcpu}` : ''}
          initialValue={`${values.maxVcpu}`}
          setValue={(maxVcpu: string) =>
            setValues({ ...values, maxVcpu: Number(maxVcpu) })
          }
          placeholder="Max Cores"
        />
        {/* TODO: Editing other min/max doesn't fix min-max error */}
        <Input
          name="min-instances"
          label="Minimum Number of Instances"
          validations={[
            isPositiveValidation,
            isIntegerValidation,
            {
              isValid: (value: string) => {
                if (values.maxInstances) {
                  return Number(value) <= values.maxInstances;
                }
                return true;
              },
              error: 'Must be less than or equal to maximum',
            },
          ]}
          type={HtmlInputType.Number}
          value={values.minInstances ? `${values.minInstances}` : ''}
          initialValue={`${values.minInstances}`}
          setValue={(minInstances: string) =>
            setValues({ ...values, minInstances: Number(minInstances) })
          }
          placeholder="Min Instances"
        />
        <Input
          name="max-instances"
          label="Maximum Number of Instances"
          validations={[
            isPositiveValidation,
            isIntegerValidation,
            {
              isValid: (value: string) => {
                if (values.maxInstances) {
                  return Number(value) <= values.maxInstances;
                }
                return true;
              },
              error: 'Must be greater than or equal to minimum',
            },
          ]}
          type={HtmlInputType.Number}
          value={values.maxInstances ? `${values.maxInstances}` : ''}
          initialValue={`${values.maxInstances}`}
          setValue={(maxInstances: string) =>
            setValues({ ...values, maxInstances: Number(maxInstances) })
          }
          placeholder="Max Instances"
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
