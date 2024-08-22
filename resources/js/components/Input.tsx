import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

interface InputPropTypes extends ComponentPropsWithRef<"input"> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputPropTypes>(
  ({ label, id, placeholder = "", ...props }, ref) => {
    return (
      <div className="gap flex w-full flex-col">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <input
          placeholder={placeholder}
          className="rounded-lg border bg-white p-4"
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
