import { Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { TIMER_BLOCK_TYPE, type Timer } from '../../constants';
import StaticClock from './StaticClock';

interface NextTimerBlockProps {
  timer: Timer;
}

export const NextTimerBlock = ({ timer }: NextTimerBlockProps) => {
  return (
    <Stack flex={2}>
      <Typography margin={2}>Up Next: </Typography>
      <Typography sx={styles.nextClockHeader}>{timer.name}</Typography>
      <StaticClock type={TIMER_BLOCK_TYPE.NEXT} seconds={timer.duration} />
    </Stack>
  );
};

export default NextTimerBlock;

const styles = {
  nextClockHeader: (theme: Theme) => ({
    fontSize: '32px',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  }),
};
