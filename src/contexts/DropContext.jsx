import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { calculateSecondsLeft, getStoredExpiryTime } from '../utils/helpers';
import supabase from '../services/supabase';

const DropContext = createContext();

const CODE = import.meta.env.VITE_DROP_CODE;
const DURATION_PER_SESSION = 10 * 60;
const STORAGE_KEY = 'sparktizen_session_expiry';

function DropProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(function () {
    const expiry = getStoredExpiryTime(STORAGE_KEY);
    return expiry !== null && calculateSecondsLeft(expiry) > 0;
  });
  const [timeLeft, setTimeLeft] = useState(function () {
    const expiry = getStoredExpiryTime(STORAGE_KEY);
    return calculateSecondsLeft(expiry);
  });
  const [isExpired, setIsExpired] = useState(false);

  const isWarning = timeLeft <= 120 && timeLeft > 0;

  useEffect(
    function () {
      if (!isUnlocked) return;

      function tick() {
        const expiryTime = getStoredExpiryTime(STORAGE_KEY);

        if (!expiryTime) {
          setIsUnlocked(false);
          return;
        }

        const seconds = calculateSecondsLeft(expiryTime);

        if (seconds <= 0) {
          setIsExpired(true);
          setTimeLeft(0);
        } else {
          setIsExpired(false);
          setTimeLeft(seconds);
        }
      }

      tick();

      const timerId = setInterval(tick, 1000);

      return () => clearInterval(timerId);
    },
    [isUnlocked]
  );

  const unlockStore = useCallback(async (passcode) => {
    if (!passcode || passcode.trim().length === 0) return false;

    try {
      const { data, error } = await supabase.rpc('check_drop_code', {
        attempt: passcode,
      });

      if (error) {
        console.error('RPC Error:', error);
        return false;
      }

      if (data === true) {
        const now = Date.now();
        const futureExpiry = now + DURATION_PER_SESSION * 1000;
        localStorage.setItem(STORAGE_KEY, futureExpiry.toString());

        setIsUnlocked(true);
        setIsExpired(false);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Unlock Error:', err);
      return false;
    }
  }, []);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsUnlocked(false);
    setIsExpired(false);
    setTimeLeft(0);
  }, []);

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

  const value = useMemo(
    () => ({
      isUnlocked,
      timeLeft,
      isExpired,
      unlockStore,
      resetSession,
      isWarning,
    }),
    [isUnlocked, timeLeft, isExpired, unlockStore, resetSession, isWarning]
  );
  return <DropContext.Provider value={value}>{children}</DropContext.Provider>;
}

function useDrop() {
  const context = useContext(DropContext);
  if (!context) {
    throw new Error('useDrop must be used within a DropProvider');
  }
  return context;
}

export { DropProvider, useDrop };
