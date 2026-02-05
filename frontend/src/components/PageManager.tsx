import { Box } from '@mui/material';
import { TIMER_PAGE_VIEW, type TimerPageView } from '../constants';
import CreateTimer from './create/CreateTimer';
import ActiveTimer from './active/ActiveTimer';

interface PageManagerProps {
  currentView: TimerPageView;
}

const PageManager = ({ currentView }: PageManagerProps) => {
  return (
    <Box>
      {currentView === TIMER_PAGE_VIEW.CREATE && <CreateTimer />}
      {currentView === TIMER_PAGE_VIEW.ACTIVE && <ActiveTimer />}
    </Box>
  );
};

export default PageManager;
