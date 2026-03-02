import { Stack, Typography, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { type Timer } from '../../constants';
import CurrentClock from './CurrentClock';

interface CurrentTimerBlock {
  timer: Timer;
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
}

export const TimerBlock = ({ timer, setTimers }: CurrentTimerBlock) => {
  const timerComplete = timer == undefined;
  const handleSkipTimer = () => {
    setTimers((previousTimers) => previousTimers.slice(1));
  };
  return (
    <>
      {timerComplete ? (
        <Typography sx={styles.container}>Timers Complete!</Typography>
      ) : (
        <Stack sx={styles.container} flex={5}>
          <Typography sx={styles.currentClockHeader}>{timer.name}</Typography>
          <CurrentClock initialSeconds={timer.duration} />
          <Button
            variant='outlined'
            sx={styles.currentClockSkip}
            color='warning'
            onClick={handleSkipTimer}
          >
            Skip
          </Button>
        </Stack>
      )}
    </>
  );
};

export default TimerBlock;

const styles = {
  currentClockHeader: (theme: Theme) => ({
    fontSize: '22px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  }),
  currentClockDuration: {
    fontSize: '80px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  currentClockSkip: (theme: Theme) => ({
    alignSelf: 'flex-end',
    margin: theme.spacing(2),
  }),
  container: (theme: Theme) => ({
    margin: theme.spacing(0.5),
    border: '1px solid black',
    borderRadius: '2px',
  }),
};
