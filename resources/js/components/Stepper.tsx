import React from "react";

interface StepperPropType {
  steps: number[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperPropType) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className=" flex-auto border transition duration-500 ease-in-out" />
          )}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${currentStep === step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
          >
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
