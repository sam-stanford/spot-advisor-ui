import React from 'react';
import AdvisorInfo from '../../../../../common/advisors/AdvisorInfo';
import { AdvisorWeights } from '../../../../../common/api/schema/Advisor';
import Modal from '../../../../common/Modal';
import EditAdvisorForm from './EditAdvisorForm';

export default function EditAdvisorModal(props: {
  isOpen: boolean;
  close: () => void;
  advisor: AdvisorInfo;
  update: (newWeights: AdvisorWeights) => void;
}) {
  const { isOpen, close, advisor, update } = props;
  return (
    <Modal
      isOpen={isOpen}
      close={close}
      Content={
        <EditAdvisorForm
          advisor={advisor}
          cancel={close}
          submit={(newWeights: AdvisorWeights) => {
            update(newWeights);
            close();
          }}
        />
      }
    />
  );
}
