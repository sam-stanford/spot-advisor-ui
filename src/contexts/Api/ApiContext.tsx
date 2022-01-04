import { createContext } from 'react';
import ApiConfig from '../../common/api/config';
import Advice from '../../common/api/schema/Advice';
import AdviseRequest from '../../common/api/schema/AdviseRequest';

const ApiContext = createContext<{
  config: ApiConfig;
  getRegions: () => Promise<string[]>;
  postAdvise: (request: AdviseRequest) => Promise<Advice>;
}>({
  config: {} as ApiConfig,
  getRegions: () =>
    new Promise((resolve) => {
      resolve([]);
    }),
  postAdvise: () =>
    new Promise((resolve) => {
      resolve({} as Advice);
    }),
});
export default ApiContext;
