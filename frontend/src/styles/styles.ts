import { styled, Typography } from '@mui/material';

export const TitleHeader = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: 1,
  marginLeft: theme.spacing(3), // Use theme spacing (1.5 * 8px = 12px)
  marginTop: theme.spacing(2), // Your specific optical alignment nudge
}));
