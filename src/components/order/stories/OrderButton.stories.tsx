import { OrderButton } from "@/components/order/OrderButton";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrderDecorator } from "./OrderDecorators";

const meta: Meta<typeof OrderButton> = {
  component: OrderButton,
  decorators: [OrderDecorator],
};

export default meta;
type Story = StoryObj<typeof OrderButton>;

export const Default: Story = {
  args: {},
};
