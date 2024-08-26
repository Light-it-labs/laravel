import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/Input";
import { Label } from "~/components/Label";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup";
import { SelectField } from "~/components/SelectField";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

export const INFORMATION_TYPE = {
  memberID: "member-id",
  personalInformation: "personal-information",
} as const;

const DIABETES_MANAGEMENT = [
  { id: 1, value: "none", label: "None" },
  { id: 1, value: "po", label: "Pills only" },
  { id: 1, value: "ni", label: "Non-insulin injections" },
  { id: 1, value: "ii", label: "Insulin injections" },
  { id: 1, value: "ip", label: "Insulin using pump therapy" },
  { id: 1, value: "de", label: " Diet and exercise" },
];

const PLAN_TYPE = [
  { id: 1, value: "medicare", label: "Medicare" },
  { id: 2, value: "medicaid", label: "Medicaid" },
  { id: 3, value: "cigna", label: "Cigna" },
  { id: 4, value: "humana", label: "Humana" },
];

const baseSchema = z.object({
  diabetesManagement: z.string().min(1, { message: "Required" }),
  insurancePlan: z.string().min(1, { message: "Required" }),
  informationType: z.enum(["member-id", "personal-information"]),
});

const memberIdSchema = baseSchema.extend({
  memberID: z.string().min(1, { message: "Member ID is required" }),
});

const personalInfoSchema = baseSchema.extend({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  month: z
    .number()
    .min(1, { message: "Month must be between 1 and 12" })
    .max(12, { message: "Month must be between 1 and 12" }),
  day: z
    .number()
    .min(1, { message: "Day must be between 1 and 31" })
    .max(31, { message: "Day must be between 1 and 31" }),
  year: z.number().min(1900, { message: "Year must be after 1900" }).max(2000, {
    message: `Year must be before 2000`,
  }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
});

export type PersonalInfoFormInputType = z.infer<typeof personalInfoSchema>;

export type MemberIdFormInputType = z.infer<typeof memberIdSchema>;

const MultipleChoiceForm = () => {
  const {
    control,
    watch,
    formState: { isValid, errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: (values, context, options) => {
      const isMemberIdSchema =
        values.informationType === INFORMATION_TYPE.memberID;
      const createResolver = zodResolver(
        isMemberIdSchema ? memberIdSchema : personalInfoSchema,
      );
      return createResolver(values, context, options);
    },
    defaultValues: {
      diabetesManagement: "",
      insurancePlan: "",
      informationType: INFORMATION_TYPE.memberID,
      memberID: "",
      firstName: "",
      lastName: "",
      month: 1,
      day: 1,
      year: 1960,
      zipCode: "",
    },
    mode: "onSubmit",
  });

  const isMemberIdSelected = watch("informationType") === "member-id";
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<MemberIdFormInputType> = (data) => {
    console.log({ data });
    navigate("/pharmacyBenefit");
  };

  return (
    <div className="mx-auto mt-8 flex w-2/3 flex-col gap-12">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="text-3xl font-bold text-[#07284A]">
          Get started with your <b>Freestyle Libre CGM System</b> today.
        </h1>
        <p className="text-[#07284A]">
          Complete the form to help us determine if the Freestyle Libre CGM
          System is suitable for you or your loved one.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Controller
            control={control}
            name="diabetesManagement"
            render={({ field }) => (
              <SelectField
                {...field}
                options={DIABETES_MANAGEMENT}
                label={"Current Diabetes management"}
              />
            )}
          />
          <Controller
            control={control}
            name="insurancePlan"
            render={({ field }) => (
              <SelectField
                {...field}
                options={PLAN_TYPE}
                label={"Plan name/type"}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="informationType"
          render={({ field }) => (
            <RadioGroup
              className="flex w-full gap-4"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div className="flex w-1/2 items-center space-x-2 rounded-lg border bg-white p-6">
                <RadioGroupItem
                  value={INFORMATION_TYPE.memberID}
                  id={INFORMATION_TYPE.memberID}
                />
                <Label htmlFor={INFORMATION_TYPE.memberID}>Member ID</Label>
              </div>
              <div className="flex w-1/2 items-center space-x-2 rounded-lg border bg-white p-6">
                <RadioGroupItem
                  value={INFORMATION_TYPE.personalInformation}
                  id={INFORMATION_TYPE.personalInformation}
                />
                <Label htmlFor={INFORMATION_TYPE.personalInformation}>
                  Personal information
                </Label>
              </div>
            </RadioGroup>
          )}
        />

        {isMemberIdSelected ? (
          <Input
            label={"Member ID"}
            errorMessage={undefined}
            className="w-1/2"
            {...register("memberID")}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between gap-4">
              <Input
                id="firstName"
                label="First name"
                {...register("firstName")}
                errorMessage={errors.firstName?.message}
              />

              <Input
                id="lastName"
                label="Last name"
                {...register("lastName")}
                errorMessage={errors.lastName?.message}
              />
            </div>
            <div>
              <p className="italic">Date of birth</p>
              <div className="flex justify-between gap-4">
                <div className="gap flex w-full flex-col">
                  <div className="flex gap-2">
                    <Input
                      id="month"
                      label="Month"
                      {...register("month", {
                        setValueAs: (v: string) => parseInt(v, 10),
                      })}
                      placeholder="MM"
                      className="w-16"
                      maxLength={2}
                      errorMessage={errors.month?.message}
                      type="number"
                    />

                    <Input
                      id="day"
                      label="Day"
                      {...register("day", {
                        setValueAs: (v: string) => parseInt(v, 10),
                      })}
                      placeholder="DD"
                      className="w-16"
                      maxLength={2}
                      errorMessage={errors.day?.message}
                      type="number"
                    />
                    <Input
                      id="year"
                      label="Year"
                      {...register("year", {
                        setValueAs: (v: string) => parseInt(v, 10),
                      })}
                      placeholder="YYYY"
                      className="w-24"
                      maxLength={4}
                      errorMessage={errors.year?.message}
                      type="number"
                    />
                  </div>
                </div>
                <Input
                  id="zipCode"
                  label="Zip code"
                  {...register("zipCode")}
                  errorMessage={errors.zipCode?.message}
                />
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-[#6B7280]">
          By continuing, you agree with the{" "}
          <a href="google.com" className="underline">
            Terms & Conditions
          </a>
        </p>
        <button
          className={tw(
            "w-1/4 self-end  rounded-md px-8 py-2 text-center text-white",
            isValid ? "bg-[#0B406F]" : "bg-[#6B7280]",
          )}
          type="submit"
          onClick={() => {
            console.log(errors);
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default MultipleChoiceForm;
