import { Stack } from '@mui/material';
import ActiveTimerHeader from './ActiveTimerHeader';
import ActiveTimerBody from './ActiveTimerBody';
const ActiveTimer: React.FC = () => {
  return (
    <Stack direction='column' sx={{ height: '100%' }}>
      <ActiveTimerHeader headerText='New Timer 1' />
      <ActiveTimerBody />
    </Stack>
  );
};

export default ActiveTimer;
