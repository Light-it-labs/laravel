export const userKeys = {
  all: ["users"] as const,
  user: (id: number | null) => [...userKeys.all, "user", id],
};
