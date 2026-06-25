import { Typography, Box, Stack, Button, type Theme } from '@mui/material';

interface RepCounterProps {
  reps: number | null;
  handleNextTimer: () => void;
}

const RepCounter = ({ reps, handleNextTimer }: RepCounterProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', p: 2 }}>
      <Stack spacing={2} alignItems='center'>
        <Typography sx={styles.repCount}>{reps ? `${reps} reps` : 'Complete reps'}</Typography>
        <Button
          variant='contained'
          sx={styles.nextButton}
          color='primary'
          onClick={handleNextTimer}
        >
          NEXT
        </Button>
      </Stack>
    </Box>
  );
};

export default RepCounter;

const styles = {
  repCount: {
    fontSize: '60px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButton: (theme: Theme) => ({
    paddingY: 4,
    paddingX: 12,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderRadius: '16px',
    minWidth: '200px',
    marginTop: theme.spacing(2),
  }),
};
