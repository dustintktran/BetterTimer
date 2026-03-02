import { Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { type Timer } from '../../constants';

interface NextTimerBlockProps {
  timer: Timer;
}

export const NextTimerBlock = ({ timer }: NextTimerBlockProps) => {
  return (
    <Stack sx={styles.container} flex={2}>
      <Typography>{timer.name}</Typography>
      <Typography>{timer.duration}</Typography>
    </Stack>
  );
};

export default NextTimerBlock;

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
