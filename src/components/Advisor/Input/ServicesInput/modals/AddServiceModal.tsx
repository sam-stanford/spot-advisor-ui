import React from 'react';
import Service from '../../../../../common/api/schema/Service';
import Modal from '../../../../common/Modal';
import ServiceInputForm from './ServiceInputForm';

export default function ServiceInputModal(props: {
  data?: Partial<Service>;
  isOpen: boolean;
  currentServiceNames: string[];
  close: () => void;
  submit: (s: Service) => void;
}): JSX.Element {
  const { data, isOpen: open, currentServiceNames, close, submit } = props;

  return (
    <Modal isOpen={open} close={close}>
      <ServiceInputForm
        submit={submit}
        cancel={close}
        currentServiceNames={currentServiceNames}
        initialValues={data}
        submitButtonText="Add"
        cancelButtonText="Cancel"
        title="New Service"
      />
    </Modal>
  );
}
