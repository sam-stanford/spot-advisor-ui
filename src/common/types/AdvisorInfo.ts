import React from 'react';
import Advisor from '../api/schema/Advisor';

type AdvisorInfo = {
  advisor: Advisor;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
  features: string[];
  isConfigurable: boolean;
};
export default AdvisorInfo;
