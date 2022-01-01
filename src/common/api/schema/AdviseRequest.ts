import Advisor from './Advisor';
import Options from './Options';
import Service from './Service';

type AdviseRequest = {
  services: Service[];
  advisor: Advisor;
  options: Options;
};

export default AdviseRequest;
