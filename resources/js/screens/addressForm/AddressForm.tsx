import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/Input";
import { SelectField } from "~/components/SelectField";
import { useMultiStepFormStore } from "~/stores";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

const STATES = [
  { id: 1, value: "AL", label: "AL - Alabama" },
  { id: 2, value: "AK", label: "AK - Alaska" },
  { id: 3, value: "AZ", label: "AZ - Arizona" },
  { id: 4, value: "AR", label: "AR - Arkansas" },
  { id: 5, value: "CA", label: "CA - California" },
  { id: 6, value: "CO", label: "CO - Colorado" },
  { id: 7, value: "CT", label: "CT - Connecticut" },
  { id: 8, value: "DE", label: "DE - Delaware" },
  { id: 9, value: "DC", label: "DC - District Of Columbia" },
  { id: 10, value: "FL", label: "FL - Florida" },
];

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
    control,
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
          <Input id="street" label="House/Street" {...register("street")} />
          <Input id="city" label="City" {...register("city")} />
        </div>
        <div className="flex justify-between gap-4">
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <SelectField {...field} options={STATES} label={"State"} />
            )}
          />
          <Input id="zipCode" label="Zip code" {...register("zipCode")} />
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
