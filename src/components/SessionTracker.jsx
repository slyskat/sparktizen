import { useQueryClient } from '@tanstack/react-query';
import { useDrop } from '../contexts/DropContext';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { toastStyle } from '../utils/toastStyle';

function SessionTracker() {
  const { isExpired, resetSession } = useDrop();

  useEffect(
    function () {
      if (isExpired) {
        resetSession();
        toast.error('Session Expired', {
          description: 'Your time ran out. The drop has locked.',
          style: { ...toastStyle, border: '1px solid hsl(0 0% 40% )' },
        });
      }
    },
    [isExpired, resetSession]
  );

  return null;
}

export default SessionTracker;
