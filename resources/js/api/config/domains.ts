export const DOMAINS = {
  project: "project",
  user: "user",
} as const;
export type Domain = keyof typeof DOMAINS;

export type SubDomains<T extends string> = T extends Domain
  ? T
  : T extends `${infer First},${infer Rest}`
  ? First extends Domain
    ? `${First},${SubDomains<Rest>}`
    : never
  : never;
