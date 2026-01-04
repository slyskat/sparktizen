import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(function () {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('error reading local storage state', error);
      return initialValue;
    }
  });

  useEffect(
    function () {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('error saving to local storage:', error);
      }
    },
    [storedValue, key]
  );

  return [storedValue, setStoredValue];
}
