import { createContext, useContext, useEffect, useState } from 'react';

const DropContext = createContext();

const CODE = 'SPARKTIZEN24';
const DURATION_PER_SESSION = 10 * 60;

function DropProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION_PER_SESSION);
  const [isExpired, setIsExpired] = useState(false);

  function unlockStore(passcode) {
    if (passcode.trim().toUpperCase() === CODE) {
      setIsUnlocked(true);
      setTimeLeft(DURATION_PER_SESSION);
      setIsExpired(false);
      return true;
    }
    return false;
  }

  function resetSession() {
    setIsUnlocked(false);
    setTimeLeft(DURATION_PER_SESSION);
    setIsExpired(false);
  }

  useEffect(
    function () {
      if (!isUnlocked || isExpired) return;

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            clearInterval(interval);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    },
    [isUnlocked, isExpired]
  );
  return (
    <DropContext.Provider
      value={{ isUnlocked, timeLeft, isExpired, unlockStore, resetSession }}
    >
      {children}
    </DropContext.Provider>
  );
}

function useDrop() {
  const context = useContext(DropContext);
  if (!context) {
    throw new Error('useDrop must be used within a DropProvider');
  }
  return context;
}

export { DropProvider, useDrop };
