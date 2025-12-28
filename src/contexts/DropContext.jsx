import { createContext, useContext, useState } from 'react';

const DropContext = createContext();

function DropProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  return (
    <DropContext.Provider value={{ isUnlocked }}>
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
