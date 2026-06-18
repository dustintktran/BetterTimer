import { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography, type Theme } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import apiClient from '../../api/apiClient';
import { TIMER_PAGE_VIEW, type TimerPageView } from '../../constants';

interface ClockInput {
  name: string;
  duration: number;
}

interface CreateTimerProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
  setActiveTimer: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CreateTimer = ({ setCurrentView, setActiveTimer }: CreateTimerProps) => {
  const [title, setTitle] = useState('');
  const [clockInputs, setClockInputs] = useState<ClockInput[]>([{ name: '', duration: 60 }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddClock = () => {
    setClockInputs([...clockInputs, { name: '', duration: 60 }]);
  };

  const handleRemoveClock = (index: number) => {
    setClockInputs(clockInputs.filter((_, i) => i !== index));
  };

  const handleClockChange = (index: number, field: keyof ClockInput, value: string | number) => {
    const updated = [...clockInputs];
    updated[index] = { ...updated[index], [field]: value };
    setClockInputs(updated);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Timer title is required');
      return;
    }

    const validClocks = clockInputs.filter((c) => c.name.trim() && c.duration > 0);
    if (validClocks.length === 0) {
      setError('At least one clock with a name and duration is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await apiClient.post('/timers', {
        title: title.trim(),
        clocks: validClocks.map((c) => ({
          name: c.name.trim(),
          duration: c.duration,
        })),
      });
      setActiveTimer(response.data.id);
      setCurrentView(TIMER_PAGE_VIEW.ACTIVE);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save timer';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.heading}>Create Timer</Typography>

      <TextField
        label='Timer Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={styles.titleInput}
      />

      <Typography sx={styles.subheading}>Clocks</Typography>

      <Stack spacing={4} sx={styles.clockList}>
        {clockInputs.map((clock, index) => (
          <Stack key={index} direction='row' spacing={4} alignItems='center'>
            <Typography sx={styles.clockIndex}>{index + 1}.</Typography>
            <TextField
              label='Clock Name'
              value={clock.name}
              onChange={(e) => handleClockChange(index, 'name', e.target.value)}
              sx={styles.clockNameInput}
            />
            <TextField
              label='Duration (seconds)'
              type='number'
              value={clock.duration}
              onChange={(e) => handleClockChange(index, 'duration', parseInt(e.target.value) || 0)}
              sx={styles.durationInput}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <IconButton
              onClick={() => handleRemoveClock(index)}
              disabled={clockInputs.length === 1}
              color='error'
            >
              <Delete />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <Button startIcon={<Add />} variant='outlined' onClick={handleAddClock} sx={styles.addButton}>
        Add Clock
      </Button>

      {error && (
        <Typography color='error' sx={styles.error}>
          {error}
        </Typography>
      )}

      <Button
        variant='contained'
        onClick={handleSave}
        disabled={saving}
        sx={styles.saveButton}
        color='primary'
      >
        {saving ? 'Saving...' : 'Save Timer'}
      </Button>
    </Box>
  );
};

export default CreateTimer;

const styles = {
  container: (theme: Theme) => ({
    padding: theme.spacing(8),
    maxWidth: 700,
    margin: '0 auto',
  }),
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleInput: {
    marginBottom: 8,
  },
  subheading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clockList: {
    marginBottom: 8,
  },
  clockIndex: {
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: 24,
  },
  clockNameInput: {
    flex: 2,
  },
  durationInput: {
    flex: 1,
    minWidth: 140,
  },
  addButton: {
    marginBottom: 8,
  },
  error: {
    marginBottom: 4,
  },
  saveButton: {
    paddingY: 4,
    paddingX: 12,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
};
