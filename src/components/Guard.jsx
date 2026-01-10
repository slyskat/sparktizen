import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from '../contexts/DropContext';
import toast from 'react-hot-toast';
import { toastStyle } from '../utils/toastStyle';

function Guard({ children }) {
  const { isUnlocked, isExpired, resetSession } = useDrop();
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpired) {
      toast.error('Session Expired', {
        description: 'Your time ran out. Please unlock the drop again.',
        style: { ...toastStyle, border: '1px solid hsl(0 0% 40% )' },
      });
      resetSession();
      navigate('/', { replace: true });
    }

    if (!isUnlocked) {
      navigate('/', { replace: true });
    }
  }, [isUnlocked, isExpired, navigate, resetSession]);

  if (!isUnlocked || isExpired) {
    return null;
  }

  return children;
}

export default Guard;
