import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MultiStepFormData {
  personalFormData?: {
    firstName: string;
    lastName: string;
    dateOfBirth: { month: number; day: number; year: number };
    phoneNumber: string;
  };
  addressFormData?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  insuranceFormData?: {
    insurancePlan: string;
    memberId: string;
    diabetesType: string;
    diabetesManagement: string;
  };
}

export interface MultiStepFormState {
  currentFormStep: number;
  multiStepFormData: MultiStepFormData | undefined;
  goToNextFormStep(): void;
  goToPreviousFormStep(): void;
  setMultiStepFormData(multiStepFormData: MultiStepFormData): void;
}

export const useMultiStepFormStore = create<MultiStepFormState>()(
  persist(
    (set) => ({
      currentFormStep: 1,
      multiStepFormData: undefined,
      goToNextFormStep: () => {
        set(({ currentFormStep }) => ({
          currentFormStep: currentFormStep + 1,
        }));
      },
      goToPreviousFormStep: () => {
        set(({ currentFormStep }) => ({
          currentFormStep: currentFormStep - 1,
        }));
      },
      setMultiStepFormData: (update: Partial<MultiStepFormData>) => {
        set((prevState) => ({
          multiStepFormData: {
            ...prevState.multiStepFormData,
            ...update,
          },
        }));
      },
    }),
    {
      name: "multiStepFormStore",
    },
  ),
);
