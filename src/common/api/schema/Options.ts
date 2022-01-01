type Options = {
  avoidRepeatedInstanceTypes: boolean;
  shareInstancesBetweenServices: boolean;
  // shareInstancesBetweenSameService: boolean; // TODO
  considerFreeInstances: boolean; // TODO
  regions: string[];
};

export default Options;
