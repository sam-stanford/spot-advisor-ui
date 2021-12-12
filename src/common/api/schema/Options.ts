import Region from './Region';

type Options = {
  avoidRepeatedInstanceTypes: boolean;
  shareInstancesBetweenApplications: boolean;
  regions: Region[];
};

export default Options;
