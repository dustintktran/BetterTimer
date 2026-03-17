import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { TIMER_BLOCK_TYPE, type Timer } from '../../constants';
import StaticClock from './StaticClock';

interface UpcomingTimerBlockProps {
  timer: Timer;
}

export const UpcomingTimerBlock = ({ timer }: UpcomingTimerBlockProps) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.upcomingClockHeader}>{timer.name}</Typography>
      <StaticClock type={TIMER_BLOCK_TYPE.UPCOMING} seconds={timer.duration} />
    </Box>
  );
};

export default UpcomingTimerBlock;

const styles = {
  container: (theme: Theme) => ({
    border: '1px solid black',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginX: theme.spacing(1),
  }),
  upcomingClockHeader: (theme: Theme) => ({
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    padding: 0,
  }),
};
