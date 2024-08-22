import type { UseFormRegister } from "react-hook-form";

import type { FormInputType } from "./PersonalForm";

interface InputPropTypes {
  id: keyof FormInputType;
  label: string;
  placeholder?: string;
  register: UseFormRegister<FormInputType>;
}

export const Input = ({
  id,
  label,
  placeholder = "",
  register,
}: InputPropTypes) => {
  return (
    <div className="gap flex w-full flex-col">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        {...register(id)}
        placeholder={placeholder}
        className="rounded-lg border bg-white p-4"
      />
    </div>
  );
};
