import React from 'react';
import AdvisorInfo from '../../../../../common/types/AdvisorInfo';
import AdvisorsListItem from './AdvisorsListItem';

export default function AdvisorsList(props: {
  advisors: AdvisorInfo[];
  select: (name: string) => void;
  clearSelection: () => void;
  selected: string;
  edit: (name: string) => void;
  view: (name: string) => void;
}) {
  const { advisors, select, clearSelection, selected, edit, view } = props;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {advisors.map((advisor) => (
        <AdvisorsListItem
          key={advisor.title}
          advisorInfo={advisor}
          isSelected={advisor.title === selected}
          toggleSelected={() => {
            if (selected === advisor.title) {
              clearSelection();
            } else {
              select(advisor.title);
            }
          }}
          edit={() => edit(advisor.title)}
          view={() => view(advisor.title)}
        />
      ))}
    </ul>
  );
}
