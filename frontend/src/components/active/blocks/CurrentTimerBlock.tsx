import { useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { CLOCK_TYPE, type Clock } from '../../../constants';
import CurrentClock from './clocks/CurrentClock';
import RepCounter from './RepCounter';
import beep from '../../../assets/beep1.mp3';
import useSound from 'use-sound';

interface CurrentTimerBlockProps {
  timer?: Clock;
  setTimers: React.Dispatch<React.SetStateAction<Clock[]>>;
  isPaused: boolean;
}

export const CurrentTimerBlock = ({ timer, setTimers, isPaused }: CurrentTimerBlockProps) => {
  const timerComplete = timer == undefined;
  const [playBeep] = useSound(beep);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  const totalSets = timer?.sets ?? 1;
  const restBetweenSets = timer?.restBetweenSets ?? 0;

  const handleRestComplete = () => {
    playBeep();
    setIsResting(false);
    setCurrentSet((prev) => prev + 1);
  };

  const handleNextSet = () => {
    playBeep();
    if (currentSet < totalSets) {
      if (restBetweenSets > 0) {
        setIsResting(true);
      } else {
        setCurrentSet((prev) => prev + 1);
      }
    } else {
      setCurrentSet(1);
      setIsResting(false);
      setTimers((previousTimers) => previousTimers.slice(1));
    }
  };

  const handleSkip = () => {
    playBeep();
    setCurrentSet(1);
    setIsResting(false);
    setTimers((previousTimers) => previousTimers.slice(1));
  };

  return (
    <Box sx={styles.block}>
      {timerComplete ? (
        <Typography margin={2}>Timers Complete!</Typography>
      ) : (
        <Stack flex={5}>
          {isResting ? (
            <>
              <Typography sx={styles.currentClockHeader}>Rest</Typography>
              <Typography sx={styles.setIndicator}>
                Before set {currentSet + 1} of {totalSets}
              </Typography>
              <CurrentClock
                key={`${timer.id}-rest-${currentSet}`}
                initialSeconds={restBetweenSets}
                handleNextTimer={handleRestComplete}
                isPaused={isPaused}
              />
            </>
          ) : (
            <>
              <Typography sx={styles.currentClockHeader}>{timer.name}</Typography>
              {totalSets > 1 && (
                <Typography sx={styles.setIndicator}>
                  Set {currentSet} of {totalSets}
                </Typography>
              )}
              {timer.type === CLOCK_TYPE.REPS ? (
                <RepCounter reps={timer.reps} handleNextTimer={handleNextSet} />
              ) : (
                <CurrentClock
                  key={`${timer.id}-${currentSet}`}
                  initialSeconds={timer.duration}
                  handleNextTimer={handleNextSet}
                  isPaused={isPaused}
                />
              )}
            </>
          )}
          <Button
            variant='outlined'
            sx={styles.currentClockSkip}
            color='warning'
            onClick={handleSkip}
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
  setIndicator: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.7,
  },
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
