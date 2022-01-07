import React, { useMemo } from 'react';
import RegionAdvice from '../../../common/api/schema/RegionAdvice';
import Service from '../../../common/api/schema/Service';
import InstancesToServicesList from './InstancesToServicesList';

export default function RegionResults(props: {
  region: string;
  regionAdvice: RegionAdvice;
  services: Service[];
}) {
  const { region, regionAdvice, services } = props;

  const { numberOfInstances, totalHourlyCost } = useMemo(() => {
    return {
      numberOfInstances: Object.keys(regionAdvice.instances).length,
      totalHourlyCost: Object.values(regionAdvice.instances)
        .map((i) => i.price)
        .reduce((totalCost, thisPrice) => totalCost + thisPrice),
    };
  }, [regionAdvice]);

  return (
    <li className="col-span-1 bg-indigo-50 rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex flex-col items-center justify-center space-x-3 mb-4">
            <span className="flex-shrink-0 inline-block px-4 py-2 text-indigo-800 text-md font-medium bg-indigo-200 rounded-md">
              {region}
            </span>
            <p className="text-indigo-800">
              {numberOfInstances}{' '}
              {numberOfInstances === 1 ? 'Instance' : 'Instances'},{' '}
              {`$${totalHourlyCost}/hr`}
            </p>
            <p className="text-indigo-800" />
          </div>
          <InstancesToServicesList
            assignments={regionAdvice.assignments}
            services={services}
            instances={regionAdvice.instances}
          />
        </div>
      </div>
    </li>
  );
}
