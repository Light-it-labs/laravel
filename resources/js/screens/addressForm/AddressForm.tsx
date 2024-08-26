import { zodResolver } from "@hookform/resolvers/zod";
import { HomeIcon } from "~/components/icons/HomeIcon";
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
  { id: 11, value: "GA", label: "GA - Georgia" },
  { id: 12, value: "HI", label: "HI - Hawaii" },
  { id: 13, value: "ID", label: "ID - Idaho" },
  { id: 14, value: "IL", label: "IL - Illinois" },
  { id: 15, value: "IN", label: "IN - Indiana" },
  { id: 16, value: "IA", label: "IA - Iowa" },
  { id: 17, value: "KS", label: "KS - Kansas" },
  { id: 18, value: "KY", label: "KY - Kentucky" },
  { id: 19, value: "LA", label: "LA - Louisiana" },
  { id: 20, value: "ME", label: "ME - Maine" },
  { id: 21, value: "MD", label: "MD - Maryland" },
  { id: 22, value: "MA", label: "MA - Massachusetts" },
  { id: 23, value: "MI", label: "MI - Michigan" },
  { id: 24, value: "MN", label: "MN - Minnesota" },
  { id: 25, value: "MS", label: "MS - Mississippi" },
  { id: 26, value: "MO", label: "MO - Missouri" },
  { id: 27, value: "MT", label: "MT - Montana" },
  { id: 28, value: "NE", label: "NE - Nebraska" },
  { id: 29, value: "NV", label: "NV - Nevada" },
  { id: 30, value: "NH", label: "NH - New Hampshire" },
  { id: 31, value: "NJ", label: "NJ - New Jersey" },
  { id: 32, value: "NM", label: "NM - New Mexico" },
  { id: 33, value: "NY", label: "NY - New York" },
  { id: 34, value: "NC", label: "NC - North Carolina" },
  { id: 35, value: "ND", label: "ND - North Dakota" },
  { id: 36, value: "OH", label: "OH - Ohio" },
  { id: 37, value: "OK", label: "OK - Oklahoma" },
  { id: 38, value: "OR", label: "OR - Oregon" },
  { id: 39, value: "PA", label: "PA - Pennsylvania" },
  { id: 40, value: "PR", label: "PR - Puerto Rico" },
  { id: 41, value: "RI", label: "RI - Rhode Island" },
  { id: 42, value: "SC", label: "SC - South Carolina" },
  { id: 43, value: "SD", label: "SD - South Dakota" },
  { id: 44, value: "TN", label: "TN - Tennessee" },
  { id: 45, value: "TX", label: "TX - Texas" },
  { id: 46, value: "UT", label: "UT - Utah" },
  { id: 47, value: "VT", label: "VT - Vermont" },
  { id: 48, value: "VI", label: "VI - Virgin Islands" },
  { id: 49, value: "VA", label: "VA - Virginia" },
  { id: 50, value: "WA", label: "WA - Washington" },
  { id: 51, value: "WV", label: "WV - West Virginia" },
  { id: 52, value: "WI", label: "WI - Wisconsin" },
  { id: 53, value: "WY", label: "WY - Wyoming" },
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
    formState: { isValid, errors },
    control,
  } = useForm<AddressFormInputType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      street: multiStepFormData?.addressFormData?.street,
      city: multiStepFormData?.addressFormData?.city,
      state: multiStepFormData?.addressFormData?.state,
      zipCode: multiStepFormData?.addressFormData?.zipCode,
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<AddressFormInputType> = (data) => {
    setMultiStepFormData({ addressFormData: data });
    goToNextFormStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon />
          <p className=" font-extrabold">Address information</p>
        </div>
        <p className="text-sm font-extrabold text-[#6B7280]">
          All fields are required
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Input
            id="street"
            label="House/Street"
            {...register("street")}
            errorMessage={errors.street?.message}
          />
          <Input
            id="city"
            label="City"
            {...register("city")}
            errorMessage={errors.city?.message}
          />
        </div>
        <div className="flex justify-between gap-4">
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <SelectField {...field} options={STATES} label={"State"} />
            )}
          />
          <Input
            id="zipCode"
            label="Zip code"
            {...register("zipCode")}
            errorMessage={errors.zipCode?.message}
          />
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
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
