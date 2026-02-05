import { useState } from 'react'
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <TimerIcon color="primary" sx={{ fontSize: 40 }} />

          <Typography variant="h4" component="h1" gutterBottom>
            Hello World
          </Typography>

          <Typography variant="body1" color="text.secondary" textAlign="center">
            Welcome to your Better Timer app.
            The MUI provider and Vite are now working together!
          </Typography>

          <Button variant="contained" size="large">
            Start Timer
          </Button>
        </Box>
      </Container>
      )
}

export default App
