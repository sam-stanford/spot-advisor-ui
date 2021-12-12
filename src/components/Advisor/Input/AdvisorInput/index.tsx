import React, { useState } from 'react';
import AdvisorInfo from '../../../../common/advisors/AdvisorInfo';
import AdvisorsList from './AdvisorsList';
import AdvisorModal from './EditAdvisorModal';
import Advisors from './Advisors';
import { AdvisorWeights } from '../../../../common/api/schema/Advisor';

export default function AdvisorInput(props: {
  selected: AdvisorInfo | undefined;
  select: (advisor: AdvisorInfo) => void;
  clearSelection: () => void;
}) {
  const { selected, select, clearSelection } = props;

  const [advisors, setAdvisors] = useState(Advisors);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAdvisorIndex, setModalAdvisorIndex] = useState(0);

  const getAdvisorIndexFromName = (name: string) => {
    const found = advisors.findIndex((a) => a.title === name);
    if (found === -1) {
      throw new Error(
        'no advisor selected',
      ); /* TODO: Make this a user-facing error */
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
          setModalOpen(true);
        }}
      />
      <AdvisorModal
        advisor={advisors[modalAdvisorIndex]}
        close={() => setModalOpen(false)}
        isOpen={modalOpen}
        update={(newWeights: AdvisorWeights) => {
          updateAdvisorWeights(advisors[modalAdvisorIndex].title, newWeights);
        }}
      />
    </>
  );
}
