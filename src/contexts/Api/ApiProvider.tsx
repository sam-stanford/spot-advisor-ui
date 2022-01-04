import React, { ReactNode, useMemo } from 'react';
import ApiConfig from '../../common/api/config';
import getRegions from '../../common/api/requests/getRegions';
import postAdvise from '../../common/api/requests/postAdvise';
import AdviseRequest from '../../common/api/schema/AdviseRequest';
import ApiContext from './ApiContext';

export default function ApiProvider(props: {
  children?: ReactNode;
  config: ApiConfig;
}): JSX.Element {
  const { children, config } = props;

  const getRegionsIndirect = () => {
    return getRegions(config);
  };

  const postAdviseIndirect = (request: AdviseRequest) => {
    return postAdvise(request, config);
  };

  const value = useMemo(() => {
    return {
      config,
      getRegions: getRegionsIndirect,
      postAdvise: postAdviseIndirect,
    };
  }, [config]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
