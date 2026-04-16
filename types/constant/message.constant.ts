const STATUS_MESSAGE = {
  SENT: "SENT",
  RECEIVER: "RECEIVER",
  SEEN: "SEEN",
  DELETE: "DELETE",
} as const;

export type StatusMessage =
  (typeof STATUS_MESSAGE)[keyof typeof STATUS_MESSAGE];
