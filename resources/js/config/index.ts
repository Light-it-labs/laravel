import { env } from "~/env";

export const isLocal = env.VITE_APP_ENV === "local";

export * from "./common";
export * from "./storybook";
