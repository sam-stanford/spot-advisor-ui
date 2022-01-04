import React from 'react';
import Advice from '../../../common/api/schema/Advice';
import Service from '../../../common/api/schema/Service';
import RegionResults from './RegionResults';

export default function AdvisorResults(props: {
  advice: Advice;
  services: Service[];
}) {
  const { advice, services } = props;

  return (
    <ul className="space-y-10">
      {Object.keys(advice).map((region) => (
        <RegionResults
          key={region}
          region={region}
          regionAdvice={advice[region]}
          services={services}
        />
      ))}
    </ul>
  );
}
