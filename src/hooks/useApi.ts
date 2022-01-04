import { useContext } from 'react';
import ApiConfig from '../common/api/config';
import Advice from '../common/api/schema/Advice';
import AdviseRequest from '../common/api/schema/AdviseRequest';
import ApiContext from '../contexts/Api/ApiContext';

export default function useApi(): {
  config: ApiConfig;
  getRegions: () => Promise<string[]>;
  postAdvise: (request: AdviseRequest) => Promise<Advice>;
} {
  return useContext(ApiContext);
}
