import { Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export const TimerBlock = () => {
  // Decide what size block and input them here
  return (
    <Stack sx={styles.container}>
      <Typography>Name</Typography>
      <Typography>Duration</Typography>
      <Typography>Skip?</Typography>
    </Stack>
  );
};

export default TimerBlock;

const styles = {
  container: (theme: Theme) => ({
    margin: theme.spacing(0.5),
    border: '1px solid black',
    borderRadius: '2px',
  }),
};
