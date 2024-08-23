import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { twMerge as tw } from "tailwind-merge";

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
              className={tw("w-full rounded-lg border bg-white p-4")}
              {...props}
            >
              {options.map(({ id, value, label }) => (
                <option key={`select-option-${label}-${id}`} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
