import { createContext, useContext, useState } from 'react';

const LandingContext = createContext();

function LandingProvider({ children }) {
  return <LandingContext.Provider>{children}</LandingContext.Provider>;
}

function useLanding() {
  const context = useContext(LandingContext);

  if (!context) {
    throw new Error('useLanding must be used within a LandingProvider');
  }

  return context;
}

export { LandingProvider, useLanding };
