import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    componentSubtitle: "A simple button component",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Click Me",
  },
};

export const LargeOutlineButton: Story = {
  args: {
    variant: "outline",
    size: "lg",
    left: <span>⚡</span>,
    children: "Click Me",
  },
};

export const DisabledButton: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    disabled: true,
    children: "Click Me",
  },
};

export const TertiaryLinkButton: Story = {
  args: {
    variant: "tertiary-link",
    size: "md",
    children: "Click Me",
  },
};
