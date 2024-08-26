import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { twMerge as tw } from "tailwind-merge";

interface LabelProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    "ref"
  > {
  className?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={tw(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...otherProps}
    />
  );
});

Label.displayName = "Label";

export { Label };
