import React, { ReactNode, useMemo } from 'react';
import ConsoleContext from './ConsoleContext';

export default function ConsoleProvider(props: { children?: ReactNode }) {
  const { children } = props;

  const value = useMemo(() => {
    return { console };
  }, [console]);

  return (
    <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>
  );
}
