import { styled, Typography } from '@mui/material';

export const TitleHeader = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: 1,
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(2),
  color: theme.palette.header.text,
}));
