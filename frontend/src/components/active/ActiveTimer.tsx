import { Stack } from '@mui/material';
import ActiveTimerHeader from './ActiveTimerHeader';
import ActiveTimerBody from './ActiveTimerBody';
const ActiveTimer: React.FC = () => {
  return (
    <Stack direction='column' sx={{ height: '100%' }}>
      <ActiveTimerHeader headerText='New Timer 1' />
      <ActiveTimerBody initialTimers={tempTimerList} />
    </Stack>
  );
};

export default ActiveTimer;

const tempTimerList = [
  {
    name: 'Center Stretch',
    duration: 120,
  },
  {
    name: 'Calf Stretch Left',
    duration: 60,
  },
  {
    name: 'Calf Stretch Right',
    duration: 60,
  },
  {
    name: 'Quad Stretch Left',
    duration: 60,
  },
  {
    name: 'Quad Stretch Right',
    duration: 60,
  },
];
