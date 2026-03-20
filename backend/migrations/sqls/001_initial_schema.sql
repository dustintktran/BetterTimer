-- Clocks (Templates)
CREATE TABLE clocks (
    id CHAR(36) PRIMARY KEY,
    user_id INT DEFAULT 1, -- Placeholder for future auth
    name VARCHAR(255) NOT NULL,
    duration INT NOT NULL
);

-- Timers (Parent)
CREATE TABLE timers (
    id CHAR(36) PRIMARY KEY,
    user_id INT DEFAULT 1, -- Placeholder for future auth
    title VARCHAR(255) NOT NULL
);

-- 3. Create the Join table (Sequence)
-- This allows one timer to have many clocks, including duplicates
CREATE TABLE timer_clock_sequence (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timer_id CHAR(36) NOT NULL,
    clock_id CHAR(36) NOT NULL,
    position INT NOT NULL, -- To keep track of the order: 1, 2, 3...
    FOREIGN KEY (timer_id) REFERENCES timers(id) ON DELETE CASCADE,
    FOREIGN KEY (clock_id) REFERENCES clocks(id) ON DELETE CASCADE
);