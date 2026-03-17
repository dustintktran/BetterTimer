import { useState, useEffect } from 'react';
import { Typography, Box, Stack, LinearProgress } from '@mui/material';
import { formatTime } from '../../helpers/formatTime';

interface CurrentClockProps {
  initialSeconds: number;
  handleNextTimer: () => void;
  isPaused: boolean;
}

const CurrentClock = ({ initialSeconds, handleNextTimer, isPaused }: CurrentClockProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) handleNextTimer();

    const timer = setInterval(() => {
      if (!isPaused) setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, isPaused]);

  const progress = (seconds / initialSeconds) * 100;

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <Typography sx={styles.countdown} color={seconds < 10 ? 'error' : 'primary'}>
            {formatTime(seconds)}
          </Typography>
        </Box>
        <LinearProgress
          variant='determinate'
          value={progress}
          color={seconds < 10 ? 'error' : 'primary'}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Stack>
    </Box>
  );
};

export default CurrentClock;

const styles = {
  countdown: {
    fontSize: '80px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};
