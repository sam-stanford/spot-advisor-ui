import React from 'react';
import RegionAdvice from '../../../common/api/schema/RegionAdvice';
import Service from '../../../common/api/schema/Service';
import InstancesToServicesList from './InstancesToServicesList';

export default function RegionResults(props: {
  region: string;
  regionAdvice: RegionAdvice;
  services: Service[];
}) {
  const { region, regionAdvice, services } = props;

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3>Region: {region}</h3>
            <p>Score: {regionAdvice.score}</p>
          </div>
          <InstancesToServicesList
            assignments={regionAdvice.assignments}
            services={services}
            instances={regionAdvice.instances}
          />
          <h3 className="text-gray-900 text-sm font-medium truncate">
            {region}
          </h3>
          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
            TODO
          </span>
        </div>
      </div>
    </li>
  );
}
