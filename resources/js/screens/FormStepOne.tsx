import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/Input";
import { useMultiStepFormStore } from "~/stores";
import DatePicker from "react-datepicker";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

import "react-datepicker/dist/react-datepicker.css";

import { useEffect } from "react";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.date().or(z.string().transform((val) => new Date(val))),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number is not valid"),
});

export type FormInputType = z.infer<typeof formSchema>;

const FormStepOne = () => {
  const { setCurrentFormStep } = useMultiStepFormStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    getValues,
  } = useForm<FormInputType>({
    resolver: zodResolver(formSchema),
  });
  console.log({ errors, isValid });
  const onSubmit: SubmitHandler<FormInputType> = () => {
    // Assuming data manipulation or other logic here
    setCurrentFormStep(2);
  };
  useEffect(() => {
    console.log(watch(), getValues());
  }),
    [watch];
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
          <Input id="firstName" label="First name" register={register} />
          <Input id="lastName" label="Last name" register={register} />
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
            register={register}
            placeholder="Phone Number (e.g., (123) 456-7890)"
          />
        </div>

        <div className="flex">
          <button
            className={tw(
              "w-1/3 rounded-md  px-8 py-2 text-center text-white",
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

export default FormStepOne;
