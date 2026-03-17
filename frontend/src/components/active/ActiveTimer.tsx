import { Stack } from '@mui/material';
import ActiveTimerHeader from './ActiveTimerHeader';
import ActiveTimerBody from './ActiveTimerBody';
const ActiveTimer: React.FC = () => {
  return (
    <Stack direction='column' sx={{ height: '100%', minHeight: 0 }}>
      <ActiveTimerHeader headerText='New Timer 1' />
      <ActiveTimerBody initialTimers={lowerbodyStretches1} />
    </Stack>
  );
};

export default ActiveTimer;

const lowerbodyStretches1 = [
  {
    name: 'Split Stretch',
    duration: 120,
  },
  {
    name: 'Calf Stretch Left',
    duration: 65,
  },
  {
    name: 'Calf Stretch Right',
    duration: 65,
  },
  {
    name: 'Quad Stretch Left',
    duration: 65,
  },
  {
    name: 'Quad Stretch Right',
    duration: 65,
  },
  {
    name: 'Hamstring Stretch',
    duration: 125,
  },
  {
    name: 'Butterfly Stretch',
    duration: 125,
  },
  {
    name: '90-90 Stretch Right',
    duration: 65,
  },
  {
    name: '90-90 Stretch Left',
    duration: 65,
  },
  {
    name: 'Crow Stretch Right',
    duration: 65,
  },
  {
    name: 'Crow Stretch Left',
    duration: 65,
  },
];
