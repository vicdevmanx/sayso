import { createContext, useState } from 'react';

// Create a context
export const GlobalContext = createContext();


// Create a provider component
const GlobalState = ({ children }) => {
  // Create a state variable
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
    theme: 'light',
    url: 'https://sayso-amber.vercel.app',
  });

  // Create a function to update the state
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;