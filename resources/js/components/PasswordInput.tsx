import React, { useState } from "react";

import { HiddenIcon } from "@/icons/HiddenIcon";
import { PadlockIcon } from "@/icons/PadlockIcon";
import ShowIcon from "./ShowIcon";

interface PasswordProps {
  id: string;
  label: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ id, label, ...props }: PasswordProps, ref) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <br />
        <div className="flex justify-between gap-5 border-b">
          <div className="flex gap-5">
            <PadlockIcon />
            <input
              className="placeholder:text-left placeholder:text-xs md:placeholder:text-sm"
              id={id}
              type={hidePassword ? "password" : "text"}
              placeholder={`Enter ${label}`}
              {...props}
              ref={ref}
            />
          </div>
          <span
            role="button"
            tabIndex={0}
            onClick={() => setHidePassword(!hidePassword)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setHidePassword(!hidePassword);
              }
            }}
          >
            {hidePassword ? <HiddenIcon /> : <ShowIcon />}
          </span>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
