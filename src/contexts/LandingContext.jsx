import { createContext, useContext, useState } from 'react';

const LandingContext = createContext();

function LandingProvider({ children }) {
  const [passcode, setPasscode] = useState('');
  const [email, setEmail] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  return (
    <LandingContext.Provider
      value={{
        email,
        setEmail,
        passcode,
        setPasscode,
        isShaking,
        setIsShaking,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

function useLanding() {
  const context = useContext(LandingContext);

  if (!context) {
    throw new Error('useLanding must be used within a LandingProvider');
  }

  return context;
}

export { LandingProvider, useLanding };
