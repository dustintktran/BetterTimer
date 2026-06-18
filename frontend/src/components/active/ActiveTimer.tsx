import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ActiveTimerHeader from './ActiveTimerHeader';
import ActiveTimerBody from './ActiveTimerBody';
import type { Timer } from '../../constants';
import apiClient from '../../api/apiClient';

interface ActiveTimerProps {
  activeTimer: string | undefined;
}

const ActiveTimer = ({ activeTimer }: ActiveTimerProps) => {
  const [timer, setTimer] = useState<Timer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTimer) return;

    const fetchTimer = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get<Timer>(`/timers/${activeTimer}`);
        setTimer(response.data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load timer';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchTimer();
  }, [activeTimer]);

  if (!activeTimer) {
    return <Typography margin={4}>Select a timer to get started.</Typography>;
  }

  if (loading) {
    return <Typography margin={4}>Loading timer...</Typography>;
  }

  if (error) {
    return <Typography margin={4}>Error: {error}</Typography>;
  }

  if (!timer) {
    return null;
  }

  return (
    <Stack direction='column' sx={{ height: '100%', minHeight: 0 }}>
      <ActiveTimerHeader headerText={timer.title} />
      <ActiveTimerBody key={timer.id} initialTimers={timer.clocks} />
    </Stack>
  );
};

export default ActiveTimer;
