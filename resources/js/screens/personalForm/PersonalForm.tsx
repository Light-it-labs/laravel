import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStepFormStore } from "~/stores";
import DatePicker from "react-datepicker";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

import "react-datepicker/dist/react-datepicker.css";

import { Input } from "~/components/Input";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.date().or(z.string().transform((val) => new Date(val))),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

export type FormInputType = z.infer<typeof formSchema>;

export const PersonalForm = () => {
  const { goToNextFormStep, setMultiStepFormData, multiStepFormData } =
    useMultiStepFormStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: multiStepFormData?.personalFormData?.firstName,
      lastName: multiStepFormData?.personalFormData?.lastName,
      dateOfBirth: multiStepFormData?.personalFormData?.dateOfBirth,
      phoneNumber: multiStepFormData?.personalFormData?.phoneNumber,
    },
  });

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    setMultiStepFormData({ personalFormData: data });
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
          <Input id="firstName" label="First name" {...register("firstName")} />
          <Input id="lastName" label="Last name" {...register("lastName")} />
        </div>
        <div className="flex justify-between gap-4">
          <div className="gap flex w-full flex-col">
            <label htmlFor={"dateOfBirth"} className="font-semibold">
              Date of Birth
            </label>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  className="w-full rounded-lg border bg-white p-4"
                />
              )}
            />
          </div>
          <Input
            id="phoneNumber"
            label="Phone"
            placeholder="Phone Number (e.g., (123) 456-7890)"
            {...register("phoneNumber")}
          />
        </div>

        <div className="flex">
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
