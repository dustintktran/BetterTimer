import { Edit } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { TitleHeader } from '../../styles/styles';

interface ActiveTimerHeaderProps {
  headerText: string;
}

const ActiveTimerHeader = ({ headerText }: ActiveTimerHeaderProps) => {
  return (
    <Stack
      direction='row'
      marginTop={1}
      marginX='2px'
      border={1}
      paddingLeft={1}
      alignItems='center'
      spacing={2}
    >
      <TitleHeader>{headerText}</TitleHeader>
      <Edit sx={{ paddingBottom: '4px' }} />
    </Stack>
  );
};

export default ActiveTimerHeader;
