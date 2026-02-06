import { Stack, Box } from '@mui/material';
const ActiveTimer: React.FC = () => {
  return (
    <Stack direction='row' sx={{ height: '100%' }}>
      <Stack direction='column' flex={2} sx={{ height: '100%' }}>
        <Box
          flex={2}
          sx={{
            border: '1px solid black',
          }}
        >
          Box1
        </Box>
        <Box
          flex={1}
          sx={{
            border: '1px solid black',
          }}
        >
          Box2
        </Box>
      </Stack>
      <Box
        flex={1}
        sx={{
          border: '1px solid black',
        }}
      >
        Box3
      </Box>
    </Stack>
  );
};

export default ActiveTimer;
