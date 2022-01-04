import React, { useState } from 'react';
import AdvisorInfo from '../../../../common/types/AdvisorInfo';
import AdvisorsList from './AdvisorsList';
import Advisors from './Advisors';
import { AdvisorWeights } from '../../../../common/api/schema/Advisor';
import useMessages from '../../../../hooks/useMessages';
import { MessageType } from '../../../../common/types/Message';
import EditAdvisorModal from './EditAdvisorModal';
import ViewAdvisorModal from './ViewAdvisorModal';

export default function AdvisorInput(props: {
  selected: AdvisorInfo | undefined;
  select: (advisor: AdvisorInfo) => void;
  clearSelection: () => void;
}) {
  const { selected, select, clearSelection } = props;

  const [advisors, setAdvisors] = useState(Advisors);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [modalAdvisorIndex, setModalAdvisorIndex] = useState(0);

  const { newMessage } = useMessages();

  const getAdvisorIndexFromName = (name: string) => {
    const found = advisors.findIndex((a) => a.title === name);
    if (found === -1) {
      newMessage('No advisor is selected', MessageType.Error);
    }
    return found;
  };

  const updateAdvisorWeights = (name: string, newWeights: AdvisorWeights) => {
    const indexToUpdate = getAdvisorIndexFromName(name);
    const updated: AdvisorInfo = {
      ...advisors[indexToUpdate],
      advisor: {
        ...advisors[indexToUpdate].advisor,
        weights: newWeights,
      },
    };
    setAdvisors([
      ...advisors.splice(0, indexToUpdate),
      updated,
      ...advisors.splice(indexToUpdate + 1),
    ]);

    if (selected !== undefined && name === selected.title) {
      select(updated);
    }
  };

  return (
    <>
      <AdvisorsList
        advisors={advisors}
        clearSelection={clearSelection}
        selected={selected ? selected.title : ''}
        select={(name: string) =>
          select(advisors[getAdvisorIndexFromName(name)])
        }
        edit={(name: string) => {
          setModalAdvisorIndex(getAdvisorIndexFromName(name));
          setEditModalOpen(true);
        }}
        view={(name: string) => {
          setModalAdvisorIndex(getAdvisorIndexFromName(name));
          setViewModalOpen(true);
        }}
      />
      <EditAdvisorModal
        advisor={advisors[modalAdvisorIndex]}
        close={() => setEditModalOpen(false)}
        isOpen={editModalOpen}
        update={(newWeights: AdvisorWeights) => {
          updateAdvisorWeights(advisors[modalAdvisorIndex].title, newWeights);
        }}
      />
      <ViewAdvisorModal
        advisor={advisors[modalAdvisorIndex]}
        close={() => setViewModalOpen(false)}
        isOpen={viewModalOpen}
      />
    </>
  );
}
