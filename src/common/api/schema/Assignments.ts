type Assignments = {
  servicesToInstances: { [serviceId: string]: string[] };
  instancesToServices: { [instanceId: string]: string[] };
};
export default Assignments;
