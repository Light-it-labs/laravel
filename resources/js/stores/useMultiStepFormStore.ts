import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MultiStepFormData {
  firstName: string;
}

export interface MultiStepFormState {
  currentFormStep: number;
  multiStepFormData: MultiStepFormData | undefined;
  setCurrentFormStep(formStep: number): void;
  setMultiStepFormData(multiStepFormData: MultiStepFormData): void;
}

export const useMultiStepFormStore = create<MultiStepFormState>()(
  persist(
    (set) => ({
      currentFormStep: 1,
      multiStepFormData: undefined,
      setCurrentFormStep: (currentFormStep: number) => {
        set(() => ({ currentFormStep }));
      },
      setMultiStepFormData: (multiStepFormData: MultiStepFormData) => {
        set(() => ({ multiStepFormData }));
      },
    }),
    {
      name: "multiStepFormStore",
    },
  ),
);
