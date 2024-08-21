import { useMultiStepFormStore } from "~/stores";
import { twMerge as tw } from "tailwind-merge";

const FormStepTwo = () => {
  const { setCurrentFormStep } = useMultiStepFormStore();

  return (
    <form>
      <button
        className={tw(
          "w-1/3 rounded-md  bg-[#0B406F] px-8 py-2 text-center text-white",
        )}
        onClick={() => setCurrentFormStep(1)}
      >
        Previous
      </button>
    </form>
  );
};

export default FormStepTwo;
