import { Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { CLOCK_TYPE, TIMER_BLOCK_TYPE, type Clock } from '../../../constants';
import StaticClock from './clocks/StaticClock';

interface NextTimerBlockProps {
  timer: Clock;
}

export const NextTimerBlock = ({ timer }: NextTimerBlockProps) => {
  return (
    <Stack flex={2} sx={styles.container}>
      <Typography margin={2}>Up Next: </Typography>
      <Typography sx={styles.nextClockHeader}>{timer.name}</Typography>
      {timer.type === CLOCK_TYPE.REPS ? (
        <Typography sx={styles.repsLabel}>{timer.reps} reps</Typography>
      ) : (
        <StaticClock type={TIMER_BLOCK_TYPE.NEXT} seconds={timer.duration} />
      )}
      {timer.sets > 1 && <Typography sx={styles.setsLabel}>&times;{timer.sets} sets</Typography>}
    </Stack>
  );
};

export default NextTimerBlock;

const styles = {
  container: (theme: Theme) => ({
    marginTop: theme.spacing(4),
    marginX: theme.spacing(4),
    border: '1px solid black',
    borderRadius: theme.spacing(2),
    background: theme.palette.background.default,
  }),
  nextClockHeader: (theme: Theme) => ({
    fontSize: '32px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }),
  repsLabel: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 1,
  },
  setsLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.7,
    paddingBottom: 1,
  },
};
