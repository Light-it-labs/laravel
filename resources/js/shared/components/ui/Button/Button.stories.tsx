import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    componentSubtitle: "A simple button component",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Click Me",
    disabled: false,
  },
};

export const ErrorButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: "error",
  },
};

export const SuccessButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: "success",
  },
};

export const InfoButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: "info",
  },
};

export const DisabledButton: Story = {
  args: {
    ...DefaultButton.args,
    disabled: true,
  },
};
