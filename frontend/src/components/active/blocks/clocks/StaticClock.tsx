import { Typography, Box, Stack, type Theme } from '@mui/material';
import { formatTime } from '../../../../helpers/formatTime';
import { TIMER_BLOCK_TYPE, type TimerBlockType } from '../../../../constants';

interface StaticClockProps {
  type: TimerBlockType;
  seconds: number;
}

const StaticClock = ({ type, seconds }: StaticClockProps) => {
  return (
    <Box
      sx={
        type === TIMER_BLOCK_TYPE.NEXT ? styles.nextClockContainer : styles.upcomingClockContainer
      }
    >
      <Stack spacing={2}>
        <Box>
          <Typography
            sx={type === TIMER_BLOCK_TYPE.NEXT ? styles.nextClock : styles.upcomingClock}
            color='grey'
          >
            {formatTime(seconds)}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default StaticClock;

const styles = {
  nextClockContainer: (theme: Theme) => ({
    width: '100%',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  }),
  upcomingClockContainer: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  nextClock: (theme: Theme) => ({
    fontSize: '60px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.palette.secondary.main,
  }),
  upcomingClock: (theme: Theme) => ({
    fontSize: '40px',
    textAlign: 'center',
    padding: 0,
    margin: 0,
    color: theme.palette.secondary.main,
  }),
};
