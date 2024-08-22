import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/Input";
import { useMultiStepFormStore } from "~/stores";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

const InsuranceFormSchema = z.object({
  insurancePlan: z.string().min(1, { message: "Insurance plan is required" }),
  memberId: z.string().min(1, { message: "Member Id is required" }),
  diabetesType: z.string().min(1, { message: "Diabetes type is required" }),
  diabetesManagement: z
    .string()
    .min(1, { message: "Diabetes management is required" }),
});

export type InsuranceFormInputType = z.infer<typeof InsuranceFormSchema>;

export const InsuranceForm = () => {
  const { goToPreviousFormStep, setMultiStepFormData, multiStepFormData } =
    useMultiStepFormStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<InsuranceFormInputType>({
    resolver: zodResolver(InsuranceFormSchema),
    defaultValues: {
      insurancePlan: multiStepFormData?.insuranceFormData?.insurancePlan,
      memberId: multiStepFormData?.insuranceFormData?.memberId,
      diabetesType: multiStepFormData?.insuranceFormData?.diabetesType,
      diabetesManagement:
        multiStepFormData?.insuranceFormData?.diabetesManagement,
    },
  });

  const onSubmit: SubmitHandler<InsuranceFormInputType> = (data) => {
    setMultiStepFormData({ insuranceFormData: data });
    navigate("/pharmacyBenefit");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className=" font-extrabold">Insurance information</p>
        <p className="text-sm font-extrabold text-[#6B7280]">
          All fields are required
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Input
            id="insurancePlan"
            label="Plan name/type"
            {...register("insurancePlan")}
          />
          <Input id="memberId" label="Member ID" {...register("memberId")} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className=" font-extrabold">Medical information</p>
            <p className="text-sm font-extrabold text-[#6B7280]">
              All fields are required
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <Input
              id="diabetesType"
              label="Diabetes Type"
              {...register("diabetesType")}
            />
            <Input
              id="diabetesManagement"
              label="Current Diabetes management"
              {...register("diabetesManagement")}
            />
          </div>
        </div>
        {isValid && (
          <p className="text-sm text-[#6B7280]">
            By continuing, you agree with the{" "}
            <a href="google.com" className="underline">
              Terms & Conditions
            </a>
          </p>
        )}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
