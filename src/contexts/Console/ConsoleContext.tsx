import { createContext } from 'react';

const ConsoleContext = createContext<{ console: Console }>({
  console, // Default console as default
});
export default ConsoleContext;
