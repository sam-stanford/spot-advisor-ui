import React, { useEffect, useState } from 'react';
import ApiConfig from '../../../../common/api/config';
import getRegions from '../../../../common/api/requests/getRegions';
import Options from '../../../../common/api/schema/Options';
import Checkbox from '../../../common/forms/Checkbox';
import MultiSelect, {
  MultiSelectOption,
} from '../../../common/forms/MultiSelect';

export default function OptionsInput(props: {
  options: Options;
  setOptions: (o: Options) => void;
}) {
  // TODO: Move elsewhere
  const config = new ApiConfig({
    baseUrl: 'http://127.0.0.1:12021',
    advisePath: '/advise',
    regionsPath: '/regions',
  });

  const { options, setOptions } = props;

  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    getRegions(config)
      .then((got) => {
        setRegions(got);
      })
      .catch((error) => {
        console.log(error); // TODO: Notification & handle
      });
  }, []);

  const generateRegionSelectOptions = (): MultiSelectOption[] => {
    return regions.map((r): MultiSelectOption => {
      return {
        value: r,
        selected: options.regions.some((region) => r === region),
      };
    });
  };

  const toggleRegionSelection = (region: string) => {
    if (options.regions.some((r) => r === region.toString())) {
      setOptions({
        ...options,
        regions: options.regions.filter((r) => r !== region.toString()),
      });
    } else {
      setOptions({
        ...options,
        regions: [...options.regions, region],
      });
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow max-w-xl mx-auto">
      <div className="px-4 py-5 sm:p-6 space-y-5">
        <MultiSelect
          name="Select Regions"
          options={generateRegionSelectOptions()}
          toggleActive={toggleRegionSelection}
        />
        <Checkbox
          name="Instance sharing (recommended)"
          description="Allow the assignment of multiple services to each instance."
          checked={options.shareInstancesBetweenServices}
          onChange={(checked) => {
            setOptions({
              ...options,
              shareInstancesBetweenServices: checked,
            });
          }}
        />
        <Checkbox
          name="Diversify instance types (recommended)"
          description="Avoid selecting the same instance type to avoid correlated failures."
          checked={options.avoidRepeatedInstanceTypes}
          onChange={(checked) => {
            setOptions({
              ...options,
              avoidRepeatedInstanceTypes: checked,
            });
          }}
        />
        <Checkbox
          name="Consider free instances (not recommended)"
          description="Allow for free instances to be selected. Not recommended due to time-limited nature of free offers."
          checked={options.considerFreeInstances}
          onChange={(checked) => {
            setOptions({
              ...options,
              considerFreeInstances: checked,
            });
          }}
        />
      </div>
    </div>
  );
}
