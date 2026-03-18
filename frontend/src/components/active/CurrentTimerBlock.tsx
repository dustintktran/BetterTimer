import { Box, Stack, Typography, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { type Timer } from '../../constants';
import CurrentClock from './CurrentClock';
import beep from '../../assets/beep1.mp3';
import useSound from 'use-sound';

interface CurrentTimerBlockProps {
  timer: Timer;
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
  isPaused: boolean;
}

export const CurrentTimerBlock = ({ timer, setTimers, isPaused }: CurrentTimerBlockProps) => {
  const timerComplete = timer == undefined;
  const [playBeep] = useSound(beep);
  const handleNextTimer = () => {
    setTimers((previousTimers) => previousTimers.slice(1));
    playBeep();
  };
  return (
    <Box sx={styles.container}>
      {timerComplete ? (
        <Typography margin={2}>Timers Complete!</Typography>
      ) : (
        <Stack flex={5}>
          <Typography sx={styles.currentClockHeader}>{timer.name}</Typography>
          <CurrentClock
            key={`{isPaused}`}
            initialSeconds={timer.duration}
            handleNextTimer={handleNextTimer}
            isPaused={isPaused}
          />
          <Button
            variant='outlined'
            sx={styles.currentClockSkip}
            color='warning'
            onClick={handleNextTimer}
          >
            Skip
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default CurrentTimerBlock;

const styles = {
  container: (theme: Theme) => ({
    marginTop: theme.spacing(2),
    marginX: theme.spacing(2),
    border: '1px solid black',
    borderRadius: theme.spacing(2),
  }),
  currentClockHeader: (theme: Theme) => ({
    fontSize: '42px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(10),
    textAlign: 'center',
  }),
  currentClockDuration: {
    fontSize: '80px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  currentClockSkip: (theme: Theme) => ({
    alignSelf: 'flex-end',
    margin: theme.spacing(2),
    py: 3,
    px: 8,
    fontSize: '1rem',
  }),
};
