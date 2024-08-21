import type { ComponentType } from "react";
import Stepper from "~/components/Stepper";
import { useMultiStepFormStore } from "~/stores";

import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";

const stepComponents: Record<number, ComponentType> = {
  1: FormStepOne,
  2: FormStepTwo,
};

const MultiStepForm = () => {
  const { currentFormStep } = useMultiStepFormStore();

  const StepComponent = stepComponents[currentFormStep];

  return (
    <div className="m-auto flex w-2/3 flex-col gap-12">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="text-3xl font-bold text-[#07284A]">
          Get started with your <b>Freestyle Libre CGM System</b> today.
        </h1>
        <p className="text-[#07284A]">
          Complete the form to help us determine if the Freestyle Libre CGM
          System is suitable for you or your loved one.
        </p>
      </div>
      <Stepper steps={[1, 2, 3]} currentStep={currentFormStep} />
      {StepComponent ? <StepComponent /> : <div>Step not found</div>}
    </div>
  );
};

export default MultiStepForm;
