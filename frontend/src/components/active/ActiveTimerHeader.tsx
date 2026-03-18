import { Edit } from '@mui/icons-material';
import { Stack, type Theme } from '@mui/material';
import { TitleHeader } from '../../styles/styles';

interface ActiveTimerHeaderProps {
  headerText: string;
}

const ActiveTimerHeader = ({ headerText }: ActiveTimerHeaderProps) => {
  return (
    <Stack direction='row' spacing={2} sx={styles.header}>
      <TitleHeader>{headerText}</TitleHeader>
      <Edit sx={{ paddingBottom: '4px' }} />
    </Stack>
  );
};

export default ActiveTimerHeader;

const styles = {
  header: (theme: Theme) => ({
    marginTop: theme.spacing(2),
    marginX: theme.spacing(2),
    border: '1px solid black',
    padding: theme.spacing(1),
    alignItems: 'center',
  }),
  editIcon: (theme: Theme) => ({
    paddingBottom: theme.spacing(1),
  }),
};
