ALTER TABLE `clocks` MODIFY COLUMN `duration` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `clocks` ADD `type` enum('timed','reps') DEFAULT 'timed' NOT NULL;--> statement-breakpoint
ALTER TABLE `clocks` ADD `reps` int;--> statement-breakpoint
ALTER TABLE `clocks` ADD `sets` int DEFAULT 1 NOT NULL;