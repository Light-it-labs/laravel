/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";

// Here we are re-declaring the forwardRef type to support generics being passed to it

export const forwardRef = React.forwardRef as <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;
