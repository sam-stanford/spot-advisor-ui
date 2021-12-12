import React from 'react';
import Advisor from '../api/schema/Advisor';

// TODO: Move this stuff to the API dir
type AdvisorInfo = {
  advisor: Advisor;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
  features: string[];
  isConfigurable: boolean;
};
export default AdvisorInfo;
