import React from 'react';
import Service from '../../../../../common/api/schema/Service';
import Modal from '../../../../common/Modal';
import ModalCloseButton from '../../../../common/Modal/ModalCloseButton';
import ServiceInputForm from './ServiceInputForm';

export default function ServiceInputModal(props: {
  data?: Partial<Service>;
  isOpen: boolean;
  currentServiceNames: string[];
  close: () => void;
  submit: (s: Service) => void; // TODO
}): JSX.Element {
  const { data, isOpen: open, currentServiceNames, close, submit } = props;

  return (
    <Modal
      isOpen={open}
      close={close}
      Content={
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <ModalCloseButton onClick={close} />
          <ServiceInputForm
            submit={submit} /* TODO */
            cancel={close}
            currentServiceNames={currentServiceNames}
            initialValues={data}
          />
        </div>
      }
    />
  );
}
