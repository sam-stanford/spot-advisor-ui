import React from 'react';
import Options from '../../../../common/api/schema/Options';
import Region from '../../../../common/api/schema/Region';
import Checkbox from '../../../common/forms/Checkbox';
import MultiSelect, {
  MultiSelectOption,
} from '../../../common/forms/MultiSelect';

export default function OptionsInput(props: {
  options: Options;
  setOptions: (o: Options) => void;
}) {
  const { options, setOptions } = props;

  const generateRegionSelectOptions = (): MultiSelectOption[] => {
    return Object.keys(Region).map((r): MultiSelectOption => {
      return {
        value: r,
        selected: options.regions.some((region) => r === region.toString()),
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
        regions: [...options.regions, region as Region],
      });
    }
  };

  return (
    <>
      <MultiSelect
        name="Select Regions"
        options={generateRegionSelectOptions()}
        toggleActive={toggleRegionSelection}
      />
      {/* TODO: Make these switches (toggle) */}
      <Checkbox
        name="Instance sharing (recommended)"
        description="Allow the assignment of multiple services to each instance."
        checked={options.shareInstancesBetweenApplications}
        onChange={(checked) => {
          setOptions({
            ...options,
            shareInstancesBetweenApplications: checked,
          });
        }}
      />
      <Checkbox
        name="Diversify instance types (recommended)"
        description="Avoid selecting the same instance type to avoid correlated failures."
        checked={options.shareInstancesBetweenApplications}
        onChange={(checked) => {
          setOptions({
            ...options,
            shareInstancesBetweenApplications: checked,
          });
        }}
      />
    </>
  );
}
