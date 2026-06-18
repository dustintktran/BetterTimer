export const TIMER_PAGE_VIEW = {
  CREATE: 'create',
  ACTIVE: 'active',
} as const;

export type TimerPageView = (typeof TIMER_PAGE_VIEW)[keyof typeof TIMER_PAGE_VIEW];

export const TIMER_BLOCK_TYPE = {
  CURRENT: 'CURRENT',
  NEXT: 'NEXT',
  UPCOMING: 'UPCOMING',
} as const;

export type TimerBlockType = (typeof TIMER_BLOCK_TYPE)[keyof typeof TIMER_BLOCK_TYPE];

export type Clock = {
  id: string;
  name: string;
  duration: number;
  position: number;
};

export type TimerSummary = {
  id: string;
  title: string;
  userId: number;
};

export type Timer = {
  id: string;
  title: string;
  clocks: Clock[];
};
