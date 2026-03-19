import { Stack } from '@mui/material';
import ActiveTimerHeader from './ActiveTimerHeader';
import ActiveTimerBody from './ActiveTimerBody';
import type { Timer, TimersMap } from '../../constants';

interface ActiveTimerProps {
  activeTimer: string | undefined;
}
const ActiveTimer = ({ activeTimer = 'lower1' }: ActiveTimerProps) => {
  return (
    <Stack direction='column' sx={{ height: '100%', minHeight: 0 }}>
      <ActiveTimerHeader headerText='New Timer 1' />
      <ActiveTimerBody key={`${activeTimer}`} initialTimers={timersMap[activeTimer]} />
    </Stack>
  );
};

export default ActiveTimer;

const lowerbodyStretches1: Timer[] = [
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

const upperBodyStretches: Timer[] = [
  {
    name: 'Chest Stretch Left',
    duration: 65,
  },
  {
    name: 'Chest Stretch Right',
    duration: 65,
  },
];

const timersMap: TimersMap = {
  lower1: lowerbodyStretches1,
  upper1: upperBodyStretches,
};
