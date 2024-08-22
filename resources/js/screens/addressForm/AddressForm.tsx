import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStepFormStore } from "~/stores";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

import { Input } from "./Input";

const addressFormSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
});

export type AddressFormInputType = z.infer<typeof addressFormSchema>;

export const AddressForm = () => {
  const {
    goToNextFormStep,
    goToPreviousFormStep,
    setMultiStepFormData,
    multiStepFormData,
  } = useMultiStepFormStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AddressFormInputType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      street: multiStepFormData?.addressFormData?.street,
      city: multiStepFormData?.addressFormData?.city,
      state: multiStepFormData?.addressFormData?.state,
      zipCode: multiStepFormData?.addressFormData?.zipCode,
    },
  });

  const onSubmit: SubmitHandler<AddressFormInputType> = (data) => {
    setMultiStepFormData({ addressFormData: data });
    goToNextFormStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className=" font-extrabold">Patient information</p>
        <p className="text-sm font-extrabold text-[#6B7280]">
          All fields are required
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Input id="street" label="House/Street" register={register} />
          <Input id="city" label="City" register={register} />
        </div>
        <div className="flex justify-between gap-4">
          <Input id="state" label="State" register={register} />
          <Input id="zipCode" label="Zip code" register={register} />
        </div>

        <div className="flex justify-between">
          <button
            className={tw(
              "w-1/4 rounded-md  border border-[#07284A] px-8 py-2 text-center text-[#07284A]",
            )}
            onClick={() => goToPreviousFormStep()}
          >
            Back
          </button>
          <button
            className={tw(
              "w-1/4 rounded-md  px-8 py-2 text-center text-white",
              isValid ? "bg-[#0B406F]" : "bg-[#6B7280]",
            )}
            type="submit"
            disabled={!isValid}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
