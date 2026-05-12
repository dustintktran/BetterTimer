-- ==========================================
-- 1. PARENT TIMERS
-- ==========================================
-- Leg Flexibility Routine
REPLACE INTO timers (id, user_id, title) 
VALUES ('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 1, 'Leg Flexibility Routine');

-- Upper Body Flexibility Routine
REPLACE INTO timers (id, user_id, title) 
VALUES ('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 1, 'Upper Body Flexibility Routine');

-- ==========================================
-- 2. CLOCK TEMPLATES (Reusable)
-- ==========================================
REPLACE INTO clocks (id, user_id, name, duration) VALUES
-- Leg Clocks
('c001-uuid', 1, 'Split Stretch', 120),
('c002-uuid', 1, 'Calf Stretch Left', 65),
('c003-uuid', 1, 'Calf Stretch Right', 65),
('c004-uuid', 1, 'Quad Stretch Left', 65),
('c005-uuid', 1, 'Quad Stretch Right', 65),
('c006-uuid', 1, 'Hamstring Stretch', 125),
('c007-uuid', 1, 'Butterfly Stretch', 125),
('c008-uuid', 1, '90-90 Stretch Right', 65),
('c009-uuid', 1, '90-90 Stretch Left', 65),
('c010-uuid', 1, 'Crow Stretch Right', 65),
('c011-uuid', 1, 'Crow Stretch Left', 65),
-- Upper Body Clocks
('c101-uuid', 1, 'Chest Stretch Left', 65),
('c102-uuid', 1, 'Chest Stretch Right', 65),
('c103-uuid', 1, 'Tricep Pull Right', 65),
('c104-uuid', 1, 'Tricep Pull Left', 65),
('c105-uuid', 1, 'Cat', 125),
('c106-uuid', 1, 'Downward Facing Dog', 125),
('c107-uuid', 1, 'Cross Body Bicep Pull Right', 65),
('c108-uuid', 1, 'Cross Body Bicep Pull Left', 65),
('c109-uuid', 1, 'Forearm Stretch', 125);

-- ==========================================
-- 3. LINKING SEQUENCES
-- ==========================================

-- Sequence for Leg Routine
REPLACE INTO timer_clock_sequence (timer_id, clock_id, position) VALUES
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c001-uuid', 1),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c002-uuid', 2),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c003-uuid', 3),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c004-uuid', 4),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c005-uuid', 5),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c006-uuid', 6),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c007-uuid', 7),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c008-uuid', 8),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c009-uuid', 9),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c010-uuid', 10),
('b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c011-uuid', 11);

-- Sequence for Upper Body Routine
REPLACE INTO timer_clock_sequence (timer_id, clock_id, position) VALUES
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c101-uuid', 1),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c102-uuid', 2),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c103-uuid', 3),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c104-uuid', 4),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c105-uuid', 5),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c106-uuid', 6),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c107-uuid', 7),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c108-uuid', 8),
('u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'c109-uuid', 9);