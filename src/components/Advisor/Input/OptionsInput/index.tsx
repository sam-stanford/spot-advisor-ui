import React, { useEffect, useState } from 'react';
import Options from '../../../../common/api/schema/Options';
import { MessageType } from '../../../../common/types/Message';
import useApi from '../../../../hooks/useApi';
import useConsole from '../../../../hooks/useConsole';
import useMessages from '../../../../hooks/useMessages';
import Checkbox from '../../../common/forms/Checkbox';
import MultiSelect, {
  MultiSelectOption,
} from '../../../common/forms/MultiSelect';

export default function OptionsInput(props: {
  options: Options;
  setOptions: (o: Options) => void;
}) {
  const { options, setOptions } = props;

  const { newMessage } = useMessages();
  const { getRegions } = useApi();
  const { Console } = useConsole();

  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    getRegions()
      .then((got) => {
        setRegions(got);
      })
      .catch((error) => {
        Console.log('Error fetching regions', error);
        newMessage(
          `Failed to connect to server, please try again later`,
          MessageType.Error,
          10000,
        );
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
          loading={regions.length === 0}
          options={generateRegionSelectOptions()}
          toggleActive={toggleRegionSelection}
        />
        <Checkbox
          id="instance-sharing"
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
          id="diversify-instances"
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
          id="free-instances"
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
