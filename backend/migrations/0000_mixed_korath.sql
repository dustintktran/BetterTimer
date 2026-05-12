CREATE TABLE `clocks` (
	`id` char(36) NOT NULL,
	`user_id` int DEFAULT 1,
	`name` varchar(255) NOT NULL,
	`duration` int NOT NULL,
	CONSTRAINT `clocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `timer_clock_sequence` (
	`id` int AUTO_INCREMENT NOT NULL,
	`timer_id` char(36) NOT NULL,
	`clock_id` char(36) NOT NULL,
	`position` int NOT NULL,
	CONSTRAINT `timer_clock_sequence_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `timers` (
	`id` char(36) NOT NULL,
	`user_id` int DEFAULT 1,
	`title` varchar(255) NOT NULL,
	CONSTRAINT `timers_id` PRIMARY KEY(`id`)
);
