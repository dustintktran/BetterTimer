export const TIMER_PAGE_VIEW = {
  CREATE: 'create',
  ACTIVE: 'active',
} as const;

export type TimerPageView = (typeof TIMER_PAGE_VIEW)[keyof typeof TIMER_PAGE_VIEW];
