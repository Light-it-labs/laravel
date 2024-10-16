/**
 * This file adheres to our standard for Zustand stores without using `persist`.
 * The state and actions are externalized, promoting modularity and separation of concerns,
 * as outlined in Zustand's best practices: https://zustand.docs.pmnd.rs/guides/practice-with-no-store-actions.
 *
 * We use a namespace in the barrel file (e.g., export * as authStore from "./useAuthStore")
 * to gather everything in one place, achieving both objectives: keeping concerns separate while avoiding
 * multiple setters with similar names, as often seen in component states or sections.
 *
 * This structure simplifies state management and ensures consistency across the project.
 */

import { create } from "zustand";

export interface ExampleStoreState {
  firstValue: string | null;
  secondValue: number | null;
  thirdValue: number | null;
}

export const useStore = create<ExampleStoreState>()(() => ({
  firstValue: null,
  secondValue: null,
  thirdValue: null,
}));

export const setFirstValue = () =>
  useStore.setState((state) => ({ firstValue: state.firstValue }));

export const setSecondValue = () =>
  useStore.setState((state) => ({ secondValue: state.secondValue }));

export const setThirdValue = () =>
  useStore.setState((state) => ({ thirdValue: state.thirdValue }));
