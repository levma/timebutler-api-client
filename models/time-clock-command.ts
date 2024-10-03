export const TIME_CLOCK_COMMANDS = [
  "start",
  "pause",
  "resume",
  "stop",
  "cancel",
  "status",
  "businesstripstart",
  "businesstripstop",
] as const;

export type TimeClockCommand = (typeof TIME_CLOCK_COMMANDS)[number];
