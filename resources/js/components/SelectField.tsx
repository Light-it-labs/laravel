import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { Field, Label, Select } from "@headlessui/react";
import { twMerge as tw } from "tailwind-merge";

import { ChevronDownIcon } from "./icons/ChevronDownIcon";

interface SelectPropTypes extends ComponentPropsWithRef<"select"> {
  options: { id: number; value: string; label: string }[];
  label: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectPropTypes>(
  ({ options, label, ...props }, ref) => {
    return (
      <div className="gap flex w-full flex-col">
        <Field>
          <Label className="font-semibold">{label}</Label>
          <div className="relative">
            <Select
              ref={ref}
              className={tw(
                "w-full appearance-none rounded-lg border bg-white p-4",
              )}
              {...props}
            >
              {options.map(({ id, value, label }) => (
                <option key={`select-option-${label}-${id}`} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              aria-hidden="true"
              className={tw(
                "group pointer-events-none absolute right-2.5 top-1/3 data-[active]:rotate-180",
              )}
            />
          </div>
        </Field>
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
