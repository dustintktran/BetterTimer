import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  type Theme,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import apiClient from '../../api/apiClient';
import { CLOCK_TYPE, TIMER_PAGE_VIEW, type ClockType, type TimerPageView } from '../../constants';

interface ClockInput {
  name: string;
  type: ClockType;
  duration: number;
  reps: number;
  sets: number;
  restBetweenSets: number;
}

interface CreateTimerProps {
  setCurrentView: React.Dispatch<React.SetStateAction<TimerPageView>>;
  setActiveTimer: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CreateTimer = ({ setCurrentView, setActiveTimer }: CreateTimerProps) => {
  const [title, setTitle] = useState('');
  const [clockInputs, setClockInputs] = useState<ClockInput[]>([
    { name: '', type: CLOCK_TYPE.TIMED, duration: 60, reps: 10, sets: 1, restBetweenSets: 0 },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddClock = () => {
    setClockInputs([
      ...clockInputs,
      { name: '', type: CLOCK_TYPE.TIMED, duration: 60, reps: 10, sets: 1, restBetweenSets: 0 },
    ]);
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

    const validClocks = clockInputs.filter(
      (c) => c.name.trim() && (c.type === CLOCK_TYPE.REPS ? c.reps > 0 : c.duration > 0)
    );
    if (validClocks.length === 0) {
      setError('At least one clock with a name and duration/reps is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await apiClient.post('/timers', {
        title: title.trim(),
        clocks: validClocks.map((c) => ({
          name: c.name.trim(),
          type: c.type,
          duration: c.type === CLOCK_TYPE.REPS ? 0 : c.duration,
          reps: c.type === CLOCK_TYPE.REPS ? c.reps : null,
          sets: c.sets,
          restBetweenSets: c.sets > 1 ? c.restBetweenSets : 0,
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

      <Stack spacing={2} sx={styles.clockList}>
        {clockInputs.map((clock, index) => (
          <Stack key={index} direction='row' spacing={1} alignItems='center'>
            <Typography sx={styles.clockIndex}>{index + 1}.</Typography>
            <TextField
              label='Name'
              value={clock.name}
              onChange={(e) => handleClockChange(index, 'name', e.target.value)}
              sx={styles.clockNameInput}
              size='small'
            />
            <ToggleButtonGroup
              value={clock.type}
              exclusive
              onChange={(_, val) => {
                if (val) handleClockChange(index, 'type', val);
              }}
              size='small'
            >
              <ToggleButton value={CLOCK_TYPE.TIMED}>Timed</ToggleButton>
              <ToggleButton value={CLOCK_TYPE.REPS}>Reps</ToggleButton>
            </ToggleButtonGroup>
            {clock.type === CLOCK_TYPE.TIMED ? (
              <TextField
                label='Duration (s)'
                type='number'
                value={clock.duration}
                onChange={(e) =>
                  handleClockChange(index, 'duration', parseInt(e.target.value) || 0)
                }
                sx={styles.durationInput}
                size='small'
                slotProps={{ htmlInput: { min: 1 } }}
              />
            ) : (
              <TextField
                label='Reps'
                type='number'
                value={clock.reps}
                onChange={(e) => handleClockChange(index, 'reps', parseInt(e.target.value) || 0)}
                sx={styles.repsInput}
                size='small'
                slotProps={{ htmlInput: { min: 1 } }}
              />
            )}
            <TextField
              label='Sets'
              type='number'
              value={clock.sets}
              onChange={(e) => handleClockChange(index, 'sets', parseInt(e.target.value) || 1)}
              sx={styles.setsInput}
              size='small'
              slotProps={{ htmlInput: { min: 1 } }}
            />
            {clock.sets > 1 && (
              <TextField
                label='Rest (s)'
                type='number'
                value={clock.restBetweenSets}
                onChange={(e) =>
                  handleClockChange(index, 'restBetweenSets', parseInt(e.target.value) || 0)
                }
                sx={styles.restInput}
                size='small'
                slotProps={{ htmlInput: { min: 0 } }}
              />
            )}
            <IconButton
              onClick={() => handleRemoveClock(index)}
              disabled={clockInputs.length === 1}
              color='error'
              size='small'
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

      <Box sx={styles.saveButtonContainer}>
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
    </Box>
  );
};

export default CreateTimer;

const styles = {
  container: (theme: Theme) => ({
    padding: theme.spacing(4),
    maxWidth: 1000,
    margin: '0 auto',
  }),
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleInput: {
    marginBottom: 4,
  },
  subheading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  clockList: {
    marginBottom: 4,
  },
  clockIndex: {
    fontSize: '14px',
    fontWeight: 'bold',
    minWidth: 20,
  },
  clockNameInput: {
    flex: 2,
    minWidth: 120,
  },
  durationInput: {
    width: 110,
    minWidth: 110,
  },
  repsInput: {
    width: 80,
    minWidth: 80,
  },
  setsInput: {
    width: 70,
    minWidth: 70,
  },
  restInput: {
    width: 90,
    minWidth: 90,
  },
  addButton: {
    marginBottom: 4,
  },
  error: {
    marginBottom: 4,
  },
  saveButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButton: {
    paddingY: 4,
    paddingX: 12,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
};
