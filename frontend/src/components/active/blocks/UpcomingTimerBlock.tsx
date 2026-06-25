import { Box, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { CLOCK_TYPE, TIMER_BLOCK_TYPE, type Clock } from '../../../constants';
import StaticClock from './clocks/StaticClock';

interface UpcomingTimerBlockProps {
  timer: Clock;
}

export const UpcomingTimerBlock = ({ timer }: UpcomingTimerBlockProps) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.upcomingClockHeader}>{timer.name}</Typography>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        {timer.type === CLOCK_TYPE.REPS ? (
          <Typography sx={styles.repsLabel}>{timer.reps} reps</Typography>
        ) : (
          <StaticClock type={TIMER_BLOCK_TYPE.UPCOMING} seconds={timer.duration} />
        )}
        {timer.sets > 1 && <Typography sx={styles.setsLabel}>&times;{timer.sets} sets</Typography>}
      </Stack>
    </Box>
  );
};

export default UpcomingTimerBlock;

const styles = {
  container: (theme: Theme) => ({
    border: '1px solid black',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginX: theme.spacing(4),
    boxShadow: 2,
    background: theme.palette.background.highlight,
  }),
  upcomingClockHeader: (theme: Theme) => ({
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    padding: 0,
    color: theme.palette.text.primary,
  }),
  repsLabel: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  setsLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    opacity: 0.7,
  },
};
