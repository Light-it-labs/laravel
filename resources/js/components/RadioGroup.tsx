import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { twMerge as tw } from "tailwind-merge";

type RadioGroupProps = Omit<RadioGroupPrimitive.RadioGroupProps, "ref"> & {
  className?: string;
};

type RadioGroupItemProps = Omit<
  RadioGroupPrimitive.RadioGroupItemProps,
  "ref"
> & {
  className?: string;
};

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={tw("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={tw(
        "border-primary text-primary focus-visible:ring-ring  h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center rounded-full border border-blue-500">
        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-transparent">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        </div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";
export { RadioGroup, RadioGroupItem };
