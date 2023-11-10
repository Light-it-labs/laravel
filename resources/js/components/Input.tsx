import type { ReactNode } from "react";
import React from "react";

interface InputProps {
  id: string;
  label: string;
  children: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, children, ...props }: InputProps, ref) => {
    return (
      <div className="flex flex-col border-b">
        <label htmlFor={id}>{label}</label>
        <br />
        <div className="flex gap-5">
          {children}
          <input
            className="placeholder:text-left placeholder:text-xs md:placeholder:text-sm"
            id={id}
            placeholder={`Enter ${label}`}
            {...props}
            ref={ref}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
