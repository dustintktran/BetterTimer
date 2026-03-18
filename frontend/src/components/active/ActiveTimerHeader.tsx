import { Edit } from '@mui/icons-material';
import { Stack, Typography, type Theme } from '@mui/material';

interface ActiveTimerHeaderProps {
  headerText: string;
}

const ActiveTimerHeader = ({ headerText }: ActiveTimerHeaderProps) => {
  return (
    <Stack direction='row' spacing={2} sx={styles.container}>
      <Typography sx={styles.header}>{headerText}</Typography>
      <Edit sx={styles.editIcon} />
    </Stack>
  );
};

export default ActiveTimerHeader;

const styles = {
  container: (theme: Theme) => ({
    marginTop: theme.spacing(4),
    marginX: theme.spacing(4),
    border: '1px solid black',
    paddingX: theme.spacing(4),
    alignItems: 'center',
    background: theme.palette.background.paper,
  }),
  header: (theme: Theme) => ({
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
  }),
  editIcon: (theme: Theme) => ({
    paddingBottom: theme.spacing(0),
  }),
};
