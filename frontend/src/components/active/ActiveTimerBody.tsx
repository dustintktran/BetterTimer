import { Stack, Box } from '@mui/material';
import TimerBlock from './TimerBlock';

const ActiveTimerBody = () => {
  return (
    <Stack direction='row' flex={20} sx={{ height: '100%' }}>
      <Stack direction='column' flex={2} sx={{ height: '100%' }}>
        <Stack flex={2} sx={styles.debug}>
          <TimerBlock />
        </Stack>
        <Box flex={1} sx={styles.debug}>
          Box2
        </Box>
      </Stack>
      <Box flex={1} sx={styles.debug}>
        Box3
      </Box>
    </Stack>
  );
};

export default ActiveTimerBody;

const styles = {
  debug: {
    border: '1px solid black',
    margin: '2px',
  },
};
