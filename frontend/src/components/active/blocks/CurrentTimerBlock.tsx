import { Box, Stack, Typography, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { type Timer } from '../../../constants';
import CurrentClock from './clocks/CurrentClock';
import beep from '../../../assets/beep1.mp3';
import useSound from 'use-sound';

interface CurrentTimerBlockProps {
  timer?: Timer;
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
    <Box sx={styles.block}>
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
  block: (theme: Theme) => ({
    marginTop: theme.spacing(4),
    marginX: theme.spacing(4),
    border: '1px solid black',
    borderRadius: theme.spacing(2),
    background: theme.palette.background.muted,
  }),
  currentClockHeader: (theme: Theme) => ({
    fontSize: '42px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.primary,
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
    color: theme.palette.warning.contrastText,
    borderColor: theme.palette.warning.contrastText,
    background: theme.palette.warning.light,
  }),
};
